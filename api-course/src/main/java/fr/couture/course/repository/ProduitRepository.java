package fr.couture.course.repository;

import fr.couture.course.entity.Produit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

/**
 * @author Anthony Couture
 *
 * <p>Repository pour communiquer avec la BDD sur l'entité Produit</p>
 */
@Repository
public interface ProduitRepository extends CrudRepository<Produit, Long> {

    /**
     * Retourne le produit selon son nom (unicité sur celui-ci) qu'il soit actif ou non
     *
     * @param nom nom du produit recherché
     * @return Optional de l'entité Produit
     */
    Optional<Produit> findProduitByNom(String nom);

    /**
     * Retourne les produits actifs
     *
     * @return Stream de l'entité Produit
     */
    Stream<Produit> findAllBySupprimerIsFalse();

    /**
     * Retourne le produit selon son id et si il est actif
     *
     * @param id id du produit recherché
     * @return Optionnal de l'entité Produit
     */
    Optional<Produit> findProduitByIDAndSupprimerIsFalse(Long id);
}
