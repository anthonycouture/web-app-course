package fr.couture.course.repository;

import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProduitRepository extends CrudRepository<Produit, Long> {

    Iterable<Produit> findAllBySupprimerIsFalseAndCategorieEquals(Categorie categorie);

    Optional<Produit> findProduitByNom(String nom);

    Iterable<Produit> findAllBySupprimerIsFalse();
}
