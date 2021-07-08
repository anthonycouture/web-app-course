package fr.couture.course.services;

import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieResponse;

import java.util.List;

public interface CategorieService {

    List<CategorieResponse> findAllCategorie();

    CategorieResponse createCategorie(String nom);

    CategorieResponse updateCategorie(Long id, String nom) throws CategoryNotFoundException;

    void deleteCategorie(Long id) throws CategoryIsUseInListException, CategoryNotFoundException;
}
