package fr.couture.course.services;

import fr.couture.course.dto.CategorieDTO;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistInCategoryException;

import java.util.List;

public interface CategorieService {

    List<CategorieDTO> findAllCategorie();

    CategorieDTO createCategorie(String nom);

    void deleteCategorie(Long id) throws ProductExistInCategoryException, CategoryNotFoundException;
}
