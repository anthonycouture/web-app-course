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

@RestController
@RequestMapping("/categories")
public class CategorieControlleur {

    private CategorieService categorieService;

    @GetMapping
    public List<CategorieResponse> findAllCategorie() {
        return categorieService.findAllCategorie();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategorieResponse createCategorie(@RequestBody CategorieRequest categorieRequest) {
        return categorieService.createCategorie(categorieRequest.getNom());
    }

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
