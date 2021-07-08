package fr.couture.course.services;

import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.payload.ProduitResponse;

import java.util.List;

public interface ProduitService {

    List<ProduitResponse> findAllProduit();

    ProduitResponse createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException;
}
