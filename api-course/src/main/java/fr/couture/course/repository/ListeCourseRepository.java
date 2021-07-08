package fr.couture.course.repository;

import fr.couture.course.entity.ListeCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ListeCourseRepository extends CrudRepository<ListeCourse, Long> {

    Optional<ListeCourse> findOneByProduit_CategorieIDEquals(Long idCategorie);

}
