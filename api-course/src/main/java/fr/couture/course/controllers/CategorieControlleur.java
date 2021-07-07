package fr.couture.course.controllers;

import fr.couture.course.dto.CategorieDTO;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.ProductExistInCategoryException;
import fr.couture.course.services.CategorieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/categories")
public class CategorieControlleur {

    private CategorieService categorieService;
    private ModelMapper modelMapper;

    @GetMapping
    public List<CategorieDTO> findAllCategorie() {
        return StreamSupport
                .stream(categorieService.findAllCategorie().spliterator(), false)
                .map(c -> modelMapper.map(c, CategorieDTO.class))
                .collect(Collectors.toList());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategorieDTO createCategorie(@RequestBody CategorieDTO categorieDTO) {
        try {
            return modelMapper.map(categorieService.createCategorie(categorieDTO.getNom()), CategorieDTO.class);
        } catch (CategoryExistException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCategorie(@PathVariable Long id) {
        try {
            categorieService.deleteCategorie(id);
        } catch (ProductExistInCategoryException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @Autowired
    public void setCategorieService(CategorieService categorieService) {
        this.categorieService = categorieService;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
