package fr.couture.course.repository;

import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.ListeCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListeCourseRepository extends CrudRepository<ListeCourse, Long> {

}
