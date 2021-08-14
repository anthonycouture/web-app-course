package fr.couture.course.services;

import fr.couture.course.entity.ItemListeCourse;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

import java.util.List;
import java.util.Optional;

public interface CourseService {

    ItemListeCourse ajoutProduitListe(@NonNull Long idProduit, int quantite) throws ProductNotFoundException, ProductInListException;

    List<ItemListeCourse> getListeCourse();

    ItemListeCourse updateItemList(@NonNull Long idItemList, @NonNull Long idProduit, int quantite) throws ItemListCourseNotFoundException, ProductNotFoundException, ProductInListException;

    Optional<ItemListeCourse> findListeCourseByProduit(@NonNull Produit produit);

    void deleteItemInList(@NonNull Long idItemList) throws ItemListCourseNotFoundException;
}
