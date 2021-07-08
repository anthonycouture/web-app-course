package fr.couture.course.services.impl;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ProduitResponse;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.ProduitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Anthony Couture
 *
 * <p>Service permettant de gérer les produits</p>
 */
@Service
public class ProduitServiceImpl implements ProduitService {

    private ProduitRepository produitRepository;
    private CategorieRepository categorieRepository;
    private ModelMapper modelMapper;

    /**
     * Retourne la liste des produits actifs
     *
     * @return la liste des produits non supprimés
     */
    @Override
    @Transactional
    public List<ProduitResponse> findAllProduit() {
        return produitRepository.findAllBySupprimerIsFalse()
                .map(p -> modelMapper.map(p, ProduitResponse.class))
                .collect(Collectors.toList());
    }

    /**
     * Créer un produit
     *
     * @param name        nom du produit
     * @param idCategorie id de la catégorie du produit
     * @return le produit créé ou sa réactivation
     * @throws ProductExistOtherCategoryException Impossible de créer un produit si un produit actif est dans une autre catégorie
     * @throws CategoryNotFoundException          Impossible de créer un produit si sa catégorie n'existe pas
     */
    @Override
    public ProduitResponse createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(idCategorie).orElseThrow(CategoryNotFoundException::new);
        var productOptional = produitRepository.findProduitByNom(name);
        if (productOptional.isPresent()) {
            var product = productOptional.get();
            if (!product.getCategorie().equals(categorie) && !product.getSupprimer()) {
                throw new ProductExistOtherCategoryException();
            }
            product.setSupprimer(false);
            product.setCategorie(categorie);
            return modelMapper.map(produitRepository.save(product), ProduitResponse.class);

        }
        var newProduct = new Produit();
        newProduct.setNom(name);
        newProduct.setCategorie(categorie);
        return modelMapper.map(produitRepository.save(newProduct), ProduitResponse.class);
    }

    /**
     * Met à jour un produit
     *
     * @param id          id du produit à mettre à jour
     * @param name        nouveau nom du produit (null si aucun changement)
     * @param idCategorie id de la catégorie du produit (null si aucun changement)
     * @return le produit après modification
     * @throws ProductNotFoundException  Impossible de modifier le produit si il n'existe pas
     * @throws CategoryNotFoundException Impossible de mettre à jour la catégorie du produit si elle n'existe pas
     */
    @Override
    public ProduitResponse updateProduit(Long id, String name, Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException {
        var produit = produitRepository.findProduitByIDAndSupprimerIsFalse(id).orElseThrow(ProductNotFoundException::new);
        if (idCategorie != null) {
            var categorie = categorieRepository.findCategorieByIDAndSupprimerIsFalse(idCategorie).orElseThrow(CategoryNotFoundException::new);
            produit.setCategorie(categorie);
        }
        if (name != null)
            produit.setNom(name);
        return modelMapper.map(produitRepository.save(produit), ProduitResponse.class);
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
