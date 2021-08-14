package fr.couture.course.services;

import fr.couture.course.entity.ItemListeCoursePreDefined;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

import java.util.List;

public interface CoursePreDefinedService {

    List<ItemListeCoursePreDefined> findAllPreDefinedListeCourse();

    ItemListeCoursePreDefined createItemPreDefinedListeCourse(@NonNull Long idProduit, int quantite) throws ProductNotFoundException, ProductInListException;

    void deleteItemPreDefinedListeCourse(@NonNull Long idItem) throws ItemListCourseNotFoundException;

    void loadPreDefinedListInListeCourse() throws ProductInListException, ProductNotFoundException;
}
