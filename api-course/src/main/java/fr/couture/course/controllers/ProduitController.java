package fr.couture.course.controllers;

import fr.couture.course.dto.ProduitDTO;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/produits")
public class ProduitController {

    private ProduitService produitService;

    @GetMapping
    public List<ProduitDTO> getProduits() {
        return produitService.findAllProduit();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProduitDTO createProduit(@RequestBody ProduitDTO produitDTO) {
        try {
            return produitService.createProduit(produitDTO.getNom(), produitDTO.getCategorieId());
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
