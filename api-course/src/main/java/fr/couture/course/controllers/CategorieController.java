package fr.couture.course.controllers;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.CategorieDTO;
import fr.couture.course.services.CategorieService;
import lombok.NonNull;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @author Anthony Couture
 *
 * <p>Controlleur qui gère les appels REST pour les catégories</p>
 */
@RestController
@RequestMapping("/categories")
public class CategorieController {

    private CategorieService categorieService;

    private ModelMapper modelMapper;

    Logger logger = LoggerFactory.getLogger(CategorieController.class);

    /**
     * Retourne les catégories
     *
     * @return la liste des catégories
     */
    @GetMapping
    @Transactional
    public List<CategorieDTO> findAllCategorie() {
        return listCategorieToListCategorieDTO(categorieService.findAllCategories());
    }

    /**
     * Créer une catégorie, status HTTP 201 si ok, 409 si la catégorie existe
     *
     * @param categorieRequest catégorie à créer
     * @return la nouvelle catégorie créée
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public CategorieDTO createCategorie(@RequestBody CategorieDTO categorieRequest) {
        try {
            return categorieToCategorieDTO(categorieService.createCategorie(categorieRequest.getNom()));
        } catch (CategoryExistException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
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
        } catch (ProductInListException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        } catch (CategoryNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }


    /**
     * Modifie une catégorie, status HTTP 200 si ok, 404 si la catégorie n'existe pas
     *
     * @param id               id de la catégorie à modifier
     * @param categorieRequest les attributs à mettre à jour
     * @return la catégorie mis à jour
     */
    @PutMapping("/{id}")
    @Transactional
    public CategorieDTO updateCategorie(@PathVariable Long id, @RequestBody CategorieDTO categorieRequest) {
        try {
            return categorieToCategorieDTO(categorieService.updateCategorie(id, categorieRequest.getNom()));
        } catch (CategoryNotFoundException e) {
            this.logger.error(e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @Autowired
    public void setCategorieService(CategorieService categorieService) {
        this.categorieService = categorieService;
    }


    private List<CategorieDTO> listCategorieToListCategorieDTO(@NonNull List<Categorie> listCategorie) {
        return listCategorie.stream()
                .filter(Objects::nonNull)
                .map(this::categorieToCategorieDTO)
                .collect(Collectors.toList());
    }

    private CategorieDTO categorieToCategorieDTO(@NonNull Categorie categorie) {
        return modelMapper.map(categorie, CategorieDTO.class);
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
