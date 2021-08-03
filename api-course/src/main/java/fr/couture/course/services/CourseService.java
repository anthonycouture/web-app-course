package fr.couture.course.services;

import fr.couture.course.entity.ItemListeCourse;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

import java.util.List;

public interface CourseService {

    ItemListeCourse ajoutProduitListe(@NonNull Long idProduit, @NonNull int quantite) throws ProductNotFoundException, ProductInListException;

    List<ItemListeCourse> getListeCourse();

    ItemListeCourse updateItemList(@NonNull Long idItemList, @NonNull Long idProduit, @NonNull int quantite) throws ItemListCourseNotFoundException, ProductNotFoundException, ProductInListException;

    void deleteItemInList(@NonNull Long idItemList) throws ItemListCourseNotFoundException;
}
