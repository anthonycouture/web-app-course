package fr.couture.course.repository;

import fr.couture.course.entity.ItemListeCoursePreDefined;
import fr.couture.course.entity.Produit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CoursePreDefinedRepository extends CrudRepository<ItemListeCoursePreDefined, Long> {


    Optional<ItemListeCoursePreDefined> findOneByProduit(Produit produit);
}
