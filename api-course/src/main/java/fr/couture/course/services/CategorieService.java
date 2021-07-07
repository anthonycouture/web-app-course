package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistInCategoryException;

import java.util.Optional;

public interface CategorieService {

    Iterable<Categorie> findAllCategorie();

    Categorie createCategorie(String nom) throws CategoryExistException;

    void deleteCategorie(Long id) throws ProductExistInCategoryException;

    Categorie getCategorieById(Long id) throws CategoryNotFoundException;
}
