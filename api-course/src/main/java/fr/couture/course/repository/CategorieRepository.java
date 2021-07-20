package fr.couture.course.repository;

import fr.couture.course.entity.Categorie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Anthony Couture
 *
 * <p>Repository pour communiquer avec la BDD sur l'entité Categorie</p>
 */
@Repository
public interface CategorieRepository extends CrudRepository<Categorie, Long> {

    /**
     * Retourne la catégorie selon son nom (unicité sur celui-ci) qu'elle soit actif ou non
     *
     * @param nom nom de la catégorie à rechercher
     * @return Optional de l'entité Categorie
     */
    Optional<Categorie> findCategorieByNom(String nom);

    /**
     * Retourne la catégorie selon son id et si elle est actif
     *
     * @param id id de la catégorie rechercher
     * @return Optional de l'entité Categorie
     */
    Optional<Categorie> findCategorieByIDAndSupprimerIsFalse(Long id);

    /**
     * Retoune les catégories actifs
     *
     * @return Stream de l'entité Categorie
     */
    Iterable<Categorie> findAllBySupprimerIsFalse();
}
