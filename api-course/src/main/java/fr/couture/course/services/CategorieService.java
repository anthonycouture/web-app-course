package fr.couture.course.services;

import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieDTO;

import java.util.List;

public interface CategorieService {

    List<CategorieDTO> findAllCategoriesActifs();

    CategorieDTO createCategorie(String nom);

    CategorieDTO updateCategorie(Long id, String nom) throws CategoryNotFoundException;

    void deleteCategorie(Long id) throws CategoryIsUseInListException, CategoryNotFoundException;
}
