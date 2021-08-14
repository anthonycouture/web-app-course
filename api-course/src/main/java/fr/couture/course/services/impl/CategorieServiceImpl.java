package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.services.CategorieService;
import fr.couture.course.services.ProduitService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
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

    private ProduitService produitService;

    /**
     * Retourne la liste des catégories
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

    @Override
    @Transactional(readOnly = true)
    public Optional<Categorie> findCategorieById(@NonNull Long id) {
        return this.categorieRepository.findById(id);
    }

    /**
     * Création d'une catégorie
     *
     * @param nom nom de la catégorie
     * @return la catégorie créée
     */
    @Override
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
    public Categorie updateCategorie(@NonNull Long id, @NonNull String nom) throws CategoryNotFoundException {
        var categorie = this.findCategorieById(id).orElseThrow(CategoryNotFoundException::new);
        categorie.setNom(nom);
        return categorieRepository.save(categorie);
    }

    /**
     * Supprime la catégorie dont l'id est passé en paramètre
     *
     * @param id id de la catégorie à supprimer
     * @throws CategoryNotFoundException impossible de supprimer une catégorie si elle n'existe pas
     * @throws ProductInListException    impossible de supprimer une catégorie si son produit est utiliser dans la liste de course
     * @throws ProductNotFoundException  impossible de supprimer une catégorie si son produit n'existe pas
     */
    @Override
    @Transactional(rollbackFor = {ProductInListException.class, ProductNotFoundException.class})
    public void deleteCategorie(@NonNull Long id) throws CategoryNotFoundException, ProductInListException, ProductNotFoundException {
        var categorie = this.findCategorieById(id).orElseThrow(CategoryNotFoundException::new);

        for (var produit : categorie.getProduits()) {
            produitService.deleteProduit(produit.getID());
        }
        categorieRepository.delete(categorie);

    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }


    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }
}
