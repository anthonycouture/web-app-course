package fr.couture.course.controllers;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ProduitDTO;
import fr.couture.course.services.ProduitService;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * @author Anthony Couture
 *
 * <p>Controlleur qui gère les appels REST pour les produits</p>
 */
@RestController
@RequestMapping("/produits")
public class ProduitController {

    private ProduitService produitService;

    private ModelMapper modelMapper;

    Logger logger = LoggerFactory.getLogger(ProduitController.class);

    /**
     * Créer un produit, status HTTP 201 si ok, 419 si la catégorie n'existe pas et
     * 409 si le produit existe
     *
     * @param produitRequest produit à créer
     * @return la produit créé
     */
    @PostMapping("/{idCategorie}")
    @ResponseStatus(HttpStatus.CREATED)
    public ProduitDTO createProduit(@PathVariable Long idCategorie, @RequestBody ProduitDTO produitRequest) {
        try {
            return produitToProduitDTO(produitService.createProduit(produitRequest.getNom(), idCategorie));
        } catch (CategoryNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        } catch (ProductExistException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    /**
     * Met à jour un produit, status HTTP 200 si ok, 404 si le produit n'existe pas et
     * 419 si la catégorie n'existe pas
     *
     * @param idCategorie    id de la catégorie du produit
     * @param produitRequest attribut à mettre à jour
     * @return Le produit mis à jour
     */
    @PutMapping("/{idCategorie}")
    public ProduitDTO updateProduit(@PathVariable Long idCategorie, @RequestBody ProduitDTO produitRequest) {
        try {
            return produitToProduitDTO(produitService.updateProduit(produitRequest.getId(), produitRequest.getNom(), idCategorie));
        } catch (ProductNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (CategoryNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        }
    }

    /**
     * Supprime un produit, status HTTP 200 si ok, 404 si le produit n'existe pas
     * et 409 si le produit est utilisé dans liste de course
     *
     * @param idProduit id du produit a supprimer
     */
    @DeleteMapping("/{idProduit}")
    public void deleteProduit(@PathVariable Long idProduit) {
        try {
            produitService.deleteProduit(idProduit);
        } catch (ProductNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductInListException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }


    private ProduitDTO produitToProduitDTO(@NonNull Produit produit) {
        return modelMapper.map(produit, ProduitDTO.class);
    }

    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
