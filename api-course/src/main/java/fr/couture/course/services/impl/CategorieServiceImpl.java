package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.ItemListeCourseRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.CategorieService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Anthony Couture
 *
 * <p>Service permettant de gérer les catégories</p>
 */
@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    private ItemListeCourseRepository itemListeCourseRepository;

    private ProduitRepository produitRepository;

    /**
     * Retourne la liste des catégoris
     *
     * @return Liste des catégories
     */
    @Override
    @Transactional(readOnly = true)
    public List<Categorie> findAllCategories() {
        return StreamSupport
                .stream(categorieRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Création d'une catégorie
     *
     * @param nom nom de la catégorie
     * @return la catégorie créée
     */
    @Override
    @Transactional
    public Categorie createCategorie(@NonNull String nom) throws CategoryExistException {
        if (categorieRepository.findCategorieByNom(nom).isPresent())
            throw new CategoryExistException();
        var newCategorie = new Categorie();
        newCategorie.setNom(nom);
        return categorieRepository.save(newCategorie);
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
    public Categorie updateCategorie(@NonNull Long id, @NonNull String nom) throws CategoryNotFoundException {
        var categorie = categorieRepository.findCategorieByID(id).orElseThrow(CategoryNotFoundException::new);
        categorie.setNom(nom);
        return categorieRepository.save(categorie);
    }

    /**
     * Supprime la catégorie dont l'id est passé en paramètre
     *
     * @param id id de la catégorie à supprimer
     * @throws CategoryInListException   impossible de supprimer une catégorie si elle est utilisé par la liste
     * @throws CategoryNotFoundException impossible de supprimer une catégorie si elle n'existe pas
     */
    @Override
    @Transactional
    public void deleteCategorie(@NonNull Long id) throws CategoryInListException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        if (itemListeCourseRepository.findOneByProduit_CategorieIDEquals(id).isPresent())
            throw new CategoryInListException();

        categorie
                .getProduits()
                .forEach(produit -> produitRepository.delete(produit));
        categorieRepository.delete(categorie);


    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setItemListeCourseRepository(ItemListeCourseRepository itemListeCourseRepository) {
        this.itemListeCourseRepository = itemListeCourseRepository;
    }


    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
}
