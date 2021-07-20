package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieDTO;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.ListeCourseRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.CategorieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Anthony Couture
 *
 * <p>Service permettant de gérer les catégories</p>
 */
@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    private ListeCourseRepository listeCourseRepository;

    private ProduitRepository produitRepository;

    private ModelMapper modelMapper;

    /**
     * Retourne la liste des catégoris actifs
     *
     * @return Liste des catégories actifs
     */
    @Override
    @Transactional
    public List<CategorieDTO> findAllCategoriesActifsWithProductsActifs() {
        return categorieRepository.findAllBySupprimerIsFalse()
                .map(c -> modelMapper.map(c, CategorieDTO.class))
                .collect(Collectors.toList());
    }

    /**
     * Création d'une catégorie
     *
     * @param nom nom de la catégorie
     * @return la catégorie créée ou réactiver à partir du nom passé en paramètre
     */
    @Override
    @Transactional
    public CategorieDTO createCategorie(String nom) {
        var categorie = categorieRepository.findCategorieByNom(nom).orElseGet(() -> {
            var newCategorie = new Categorie();
            newCategorie.setNom(nom);
            return newCategorie;
        });

        categorie.setSupprimer(false);
        return modelMapper.map(categorieRepository.save(categorie), CategorieDTO.class);
    }

    /**
     * Met à jour les attributs d'une catégorie
     *
     * @param id  id de la catégorie à modifier
     * @param nom nouveau nom de la catégorie
     * @return catégorie mis à jour
     * @throws CategoryNotFoundException impossible de modifier une catégorie si elle n'existe pas
     */
    @Override
    @Transactional
    public CategorieDTO updateCategorie(Long id, String nom) throws CategoryNotFoundException {
        var categorie = categorieRepository.findCategorieByIDAndSupprimerIsFalse(id).orElseThrow(CategoryNotFoundException::new);
        categorie.setNom(nom);
        return modelMapper.map(categorieRepository.save(categorie), CategorieDTO.class);
    }

    /**
     * Supprime la catégorie dont l'id est passé en paramètre
     *
     * @param id id de la catégorie à supprimer
     * @throws CategoryIsUseInListException impossible de supprimer une catégorie si elle est utilisé par la liste
     * @throws CategoryNotFoundException    impossible de supprimer une catégorie si elle n'existe pas
     */
    @Transactional
    @Override
    public void deleteCategorie(Long id) throws CategoryIsUseInListException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        var produitIterable = listeCourseRepository.findOneByProduit_CategorieIDEquals(id);
        if (produitIterable.isEmpty()) {
            categorie
                    .getProduits()
                    .forEach(produit -> {
                        produit.setSupprimer(true);
                        produitRepository.save(produit);
                    });
            categorie.setSupprimer(true);
            categorieRepository.save(categorie);
        } else
            throw new CategoryIsUseInListException();
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Autowired
    public void setListeCourseRepository(ListeCourseRepository listeCourseRepository) {
        this.listeCourseRepository = listeCourseRepository;
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
}
