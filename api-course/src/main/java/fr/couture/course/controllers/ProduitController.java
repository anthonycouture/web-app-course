package fr.couture.course.controllers;

import fr.couture.course.dto.ProduitDTO;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.CategorieService;
import fr.couture.course.services.ProduitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/produits")
public class ProduitController {

    private ProduitRepository produitRepository;

    private CategorieService categorieService;

    private ProduitService produitService;

    private ModelMapper modelMapper;

    @GetMapping
    public List<ProduitDTO> getProduits() {
        return StreamSupport
                .stream(produitRepository.findAll().spliterator(), false)
                .map(p -> modelMapper.map(p, ProduitDTO.class))
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProduitDTO createProduit(@RequestBody ProduitDTO produitDTO){
        try {
            var categorie = categorieService.getCategorieById(produitDTO.getCategorieId());
            return modelMapper.map(produitService.createProduit(produitDTO.getNom(), categorie), ProduitDTO.class);
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
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Autowired
    public void setCategorieService(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }
}
