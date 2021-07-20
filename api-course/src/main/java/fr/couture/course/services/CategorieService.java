package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExist;
import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;

import java.util.List;

public interface CategorieService {

    List<Categorie> findAllCategories();

    Categorie createCategorie(String nom) throws CategoryExist;

    Categorie updateCategorie(Long id, String nom) throws CategoryNotFoundException;

    void deleteCategorie(Long id) throws CategoryIsUseInListException, CategoryNotFoundException;
}
