package fr.couture.course.controllers;

import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ProduitDTO;
import fr.couture.course.services.ProduitService;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        } catch (ProductExistException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    /**
     * Met à jour un produit, status HTTP 200 si ok, 404 si le produit n'existe pas et
     * 419 si la catégorie n'existe pas
     *
     * @param idCategorie    id de la catégorie du produit
     * @param idProduit      id du produit à mettre à jour
     * @param produitRequest attribut à mettre à jour
     * @return Le produit mis à jour
     */
    @PutMapping("/{idCategorie}/{idProduit}")
    public ProduitDTO updateProduit(@PathVariable Long idCategorie, @PathVariable Long idProduit, @RequestBody ProduitDTO produitRequest) {
        try {
            return produitToProduitDTO(produitService.updateProduit(idProduit, produitRequest.getNom(), idCategorie));
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (CategoryNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        }
    }


    private List<ProduitDTO> listProduitToListProduitDTO(@NonNull List<Produit> listProduit) {
        return listProduit.stream()
                .filter(Objects::nonNull)
                .map(this::produitToProduitDTO)
                .collect(Collectors.toList());
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
