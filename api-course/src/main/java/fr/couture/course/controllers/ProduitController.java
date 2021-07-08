package fr.couture.course.controllers;

import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.payload.ProduitRequest;
import fr.couture.course.payload.ProduitResponse;
import fr.couture.course.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * @author Anthony Couture
 *
 * <p>Controlleur qui gère les appels REST pour les produits</p>
 */
@RestController
@RequestMapping("/produits")
public class ProduitController {

    private ProduitService produitService;

    /**
     * Retourne les produits actifs
     * @return la liste des produits actifs
     */
    @GetMapping
    public List<ProduitResponse> getProduits() {
        return produitService.findAllProduit();
    }

    /**
     * Créer un produit, status HTTP 201 si ok, 419 si la catégorie n'existe pas et
     * 409 si le produit existe dans une autre catégorie
     * @param produitRequest produit à créer
     * @return la produit créé
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProduitResponse createProduit(@RequestBody ProduitRequest produitRequest) {
        try {
            return produitService.createProduit(produitRequest.getNom(), produitRequest.getCategorieId());
        } catch (CategoryNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        } catch (ProductExistOtherCategoryException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }
}
