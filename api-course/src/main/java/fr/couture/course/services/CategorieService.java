package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import lombok.NonNull;

import java.util.List;

public interface CategorieService {

    List<Categorie> findAllCategories();

    Categorie createCategorie(@NonNull String nom) throws CategoryExistException;

    Categorie updateCategorie(@NonNull Long id, @NonNull String nom) throws CategoryNotFoundException;

    void deleteCategorie(@NonNull Long id) throws CategoryInListException, CategoryNotFoundException;
}
