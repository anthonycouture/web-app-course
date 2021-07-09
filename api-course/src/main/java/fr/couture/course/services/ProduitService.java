package fr.couture.course.services;

import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ProduitResponse;

import java.util.List;

public interface ProduitService {

    List<ProduitResponse> findAllProduitActifs();

    ProduitResponse createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException;

    ProduitResponse updateProduit(Long id, String name, Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException;
}
