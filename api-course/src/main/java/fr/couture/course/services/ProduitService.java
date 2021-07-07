package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;

public interface ProduitService {

    Iterable<Produit> findProduitByCategorie(Categorie categorie);

    Produit createProduit(String name, Categorie categorie) throws ProductExistOtherCategoryException;
}
