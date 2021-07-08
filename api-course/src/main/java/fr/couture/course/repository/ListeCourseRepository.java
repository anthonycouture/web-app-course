package fr.couture.course.repository;

import fr.couture.course.entity.ListeCourse;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author Anthony Couture
 *
 * <p>Repository pour communiquer avec la BDD sur l'entité ListeCourse</p>
 */
@Repository
public interface ListeCourseRepository extends CrudRepository<ListeCourse, Long> {

    /**
     * Retourne le premier item de ListeCourse dont le produit à la catégorie en paramètre
     *
     * @param idCategorie id de la catégorie qu'on souhaite sur un produit de la liste
     * @return Optional de l'entité ListeCourse
     */
    Optional<ListeCourse> findOneByProduit_CategorieIDEquals(Long idCategorie);

}
