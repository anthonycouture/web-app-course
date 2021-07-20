package fr.couture.course.services;

import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ProduitDTO;

public interface ProduitService {

    ProduitDTO createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException;

    ProduitDTO updateProduit(Long id, String name, Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException;
}
