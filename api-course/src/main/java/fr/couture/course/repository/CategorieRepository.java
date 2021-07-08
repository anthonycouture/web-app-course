package fr.couture.course.repository;

import fr.couture.course.entity.Categorie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.stream.Stream;

@Repository
public interface CategorieRepository extends CrudRepository<Categorie, Long> {

    Optional<Categorie> findCategorieByNom(String nom);

    Stream<Categorie> findAllBySupprimerIsFalse();
}
