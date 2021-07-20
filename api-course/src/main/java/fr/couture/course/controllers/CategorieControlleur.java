package fr.couture.course.controllers;

import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieDTO;
import fr.couture.course.payload.ProduitDTO;
import fr.couture.course.services.CategorieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Anthony Couture
 *
 * <p>Controlleur qui gère les appels REST pour les catégories</p>
 */
@RestController
@RequestMapping("/categories")
public class CategorieControlleur {

    private CategorieService categorieService;

    private ModelMapper modelMapper;

    /**
     * Retourne les catégories
     *
     * @return la liste des catégories actifs
     */
    @GetMapping
    @Transactional
    public List<CategorieDTO> findAllCategorie() {
        return listCategorieToListCategorieDTO(categorieService.findAllCategoriesActifs());
    }

    /**
     * Créer une catégorie, status HTTP 201 si ok
     *
     * @param categorieRequest catégorie à créer
     * @return la nouvelle catégorie créée
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public CategorieDTO createCategorie(@RequestBody CategorieDTO categorieRequest) {
        return categorieToCategorieDTO(categorieService.createCategorie(categorieRequest.getNom()));
    }

    /**
     * Supprimer une catégorie, status HTTP 200 si ok, 409 si la catégorie est utiliser dans la liste et
     * 404 si la catégorie n'existe pas
     *
     * @param id id de la catégorie à supprimer
     */
    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable Long id) {
        try {
            categorieService.deleteCategorie(id);
        } catch (CategoryIsUseInListException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        } catch (CategoryNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }


    /**
     * Modifie une catégorie, status HTTP 200 si ok, 404 si la catégorie n'existe pas
     *
     * @param id               id de la catégorie à modifier
     * @param categorieRequest les attributs à mettre à jour
     * @return la catégorie mis à jour
     */
    // TODO refaire le mapping ici
    @PutMapping("/{id}")
    public CategorieDTO updateCategorie(@PathVariable Long id, @RequestBody CategorieDTO categorieRequest) {
        try {
            return categorieService.updateCategorie(id, categorieRequest.getNom());
        } catch (CategoryNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @Autowired
    public void setCategorieService(CategorieService categorieService) {
        this.categorieService = categorieService;
    }


    private List<CategorieDTO> listCategorieToListCategorieDTO(List<Categorie> listCategorie) {
        return listCategorie.stream()
                .map(this::categorieToCategorieDTO)
                .collect(Collectors.toList());
    }

    private CategorieDTO categorieToCategorieDTO(Categorie categorie) {
        if (categorie.getSupprimer())
            return null;

        var produitDelete = categorie.getProduits().stream()
                .filter(Produit::getSupprimer)
                .map(p -> modelMapper.map(p, ProduitDTO.class))
                .collect(Collectors.toList());

        var categorieDTO = modelMapper.map(categorie, CategorieDTO.class);

        categorieDTO.setProduits(
                categorieDTO.getProduits()
                        .stream()
                        .filter(p -> !produitDelete.contains(p))
                        .collect(Collectors.toList())
        );


        return categorieDTO;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
