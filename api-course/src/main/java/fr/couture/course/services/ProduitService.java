package fr.couture.course.services;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductNotFoundException;

public interface ProduitService {

    Produit createProduit(String name, Long idCategorie) throws ProductExistException, CategoryNotFoundException;

    Produit updateProduit(Long id, String name, Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException;
}
