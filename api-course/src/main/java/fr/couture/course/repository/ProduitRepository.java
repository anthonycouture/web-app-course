package fr.couture.course.repository;

import fr.couture.course.entity.Produit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface ProduitRepository extends CrudRepository<Produit, Long> {

    Optional<Produit> findProduitByNom(String nom);

    Stream<Produit> findAllBySupprimerIsFalse();
}
