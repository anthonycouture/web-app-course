package fr.couture.course.services;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import lombok.NonNull;

import java.util.Optional;

public interface ProduitService {

    Optional<Produit> findProduitById(@NonNull Long id);

    Produit createProduit(@NonNull String name, @NonNull Long idCategorie) throws ProductExistException, CategoryNotFoundException;

    Produit updateProduit(@NonNull Long id, @NonNull String name, @NonNull Long idCategorie) throws ProductNotFoundException, CategoryNotFoundException;

    void deleteProduit(@NonNull Long id) throws ProductNotFoundException, ProductInListException;
}
