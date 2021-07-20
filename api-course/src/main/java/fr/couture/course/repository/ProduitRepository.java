package fr.couture.course.repository;

import fr.couture.course.entity.Produit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Anthony Couture
 *
 * <p>Repository pour communiquer avec la BDD sur l'entité Produit</p>
 */
@Repository
public interface ProduitRepository extends CrudRepository<Produit, Long> {

    /**
     * Retourne le produit selon son nom (unicité sur celui-ci)
     *
     * @param nom nom du produit recherché
     * @return Optional de l'entité Produit
     */
    Optional<Produit> findProduitByNom(String nom);
}
