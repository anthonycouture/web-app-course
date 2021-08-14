package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

import java.util.List;
import java.util.Optional;

public interface CategorieService {

    List<Categorie> findAllCategories();

    Optional<Categorie> findCategorieById(@NonNull Long id);

    Categorie createCategorie(@NonNull String nom) throws CategoryExistException;

    Categorie updateCategorie(@NonNull Long id, @NonNull String nom) throws CategoryNotFoundException;

    void deleteCategorie(@NonNull Long id) throws CategoryNotFoundException, ProductInListException, ProductNotFoundException;
}
