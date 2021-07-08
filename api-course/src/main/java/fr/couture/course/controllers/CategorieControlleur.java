package fr.couture.course.controllers;

import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieRequest;
import fr.couture.course.payload.CategorieResponse;
import fr.couture.course.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

/**
 * @author Anthony Couture
 *
 * <p>Controlleur qui gère les appels REST pour les catégories</p>
 */
@RestController
@RequestMapping("/categories")
public class CategorieControlleur {

    private CategorieService categorieService;

    /**
     * Retourne les catégories actifs
     * @return la liste des catégories actifs
     */
    @GetMapping
    public List<CategorieResponse> findAllCategorie() {
        return categorieService.findAllCategorie();
    }

    /**
     * Créer une catégorie, status HTTP 201 si ok
     * @param categorieRequest catégorie à créer
     * @return la nouvelle catégorie créée
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategorieResponse createCategorie(@RequestBody CategorieRequest categorieRequest) {
        return categorieService.createCategorie(categorieRequest.getNom());
    }

    /**
     * Supprimer une catégorie
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

    @Autowired
    public void setCategorieService(CategorieService categorieService) {
        this.categorieService = categorieService;
    }
}
