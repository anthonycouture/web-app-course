package fr.couture.course.services;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

public interface ProduitService {

    Produit createProduit(@NonNull String name, @NonNull Long idCategorie) throws ProductExistException, CategoryNotFoundException;

    Produit updateProduit(@NonNull Long id, @NonNull String name, @NonNull Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException;

    void deleteProduit(@NonNull Long id) throws ProductNotFoundException, ProductInListException;
}
