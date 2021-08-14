package fr.couture.course.services.impl;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.CourseRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.ProduitService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Anthony Couture
 *
 * <p>Service permettant de gérer les produits</p>
 */
@Service
public class ProduitServiceImpl implements ProduitService {

    private ProduitRepository produitRepository;
    private CategorieRepository categorieRepository;
    private CourseRepository courseRepository;

    /**
     * Créer un produit
     *
     * @param name        nom du produit
     * @param idCategorie id de la catégorie du produit
     * @return le produit créé ou sa réactivation
     * @throws ProductExistException     Impossible de créer un produit si il existe déjà
     * @throws CategoryNotFoundException Impossible de créer un produit si sa catégorie n'existe pas
     */
    @Override
    public Produit createProduit(@NonNull String name, @NonNull Long idCategorie) throws ProductExistException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(idCategorie).orElseThrow(CategoryNotFoundException::new);
        if (produitRepository.findProduitByNom(name).isPresent())
            throw new ProductExistException();
        var newProduct = new Produit();
        newProduct.setNom(name);
        newProduct.setCategorie(categorie);
        return produitRepository.save(newProduct);
    }

    /**
     * Met à jour un produit
     *
     * @param id          id du produit à mettre à jour
     * @param name        nouveau nom du produit
     * @param idCategorie id de la catégorie du produit
     * @return le produit après modification
     * @throws ProductNotFoundException  Impossible de modifier le produit si il n'existe pas
     * @throws CategoryNotFoundException Impossible de mettre à jour la catégorie du produit si elle n'existe pas
     */
    @Override
    public Produit updateProduit(@NonNull Long id, @NonNull String name, @NonNull Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException {
        var produit = produitRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        var categorie = categorieRepository.findById(idCategorie).orElseThrow(CategoryNotFoundException::new);
        produit.setCategorie(categorie);
        produit.setNom(name);
        return produitRepository.save(produit);
    }

    @Override
    public void deleteProduit(@NonNull Long id) throws ProductNotFoundException, ProductInListException {
        var produit = produitRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        if (courseRepository.findItemListeCourseByProduit(produit).isPresent())
            throw new ProductInListException();
        produitRepository.delete(produit);
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
    public void setCourseRepository(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }
}
