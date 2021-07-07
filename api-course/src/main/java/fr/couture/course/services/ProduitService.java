package fr.couture.course.services;

import fr.couture.course.dto.ProduitDTO;
import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;

import java.util.List;

public interface ProduitService {

    Iterable<Produit> findProduitByCategorie(Categorie categorie);

    List<ProduitDTO> findAllProduit();

    ProduitDTO createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException;
}
