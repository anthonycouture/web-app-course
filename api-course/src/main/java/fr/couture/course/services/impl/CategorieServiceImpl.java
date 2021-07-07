package fr.couture.course.services.impl;

import fr.couture.course.dto.CategorieDTO;
import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistInCategoryException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.services.CategorieService;
import fr.couture.course.services.ProduitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    private ProduitService produitService;

    private ModelMapper modelMapper;

    @Override
    public List<CategorieDTO> findAllCategorie() {
        return StreamSupport
                .stream(categorieRepository.findAllBySupprimerIsFalse().spliterator(), false)
                .map(c -> modelMapper.map(c, CategorieDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public CategorieDTO createCategorie(String nom) {
        var categorie = categorieRepository.findCategorieByNom(nom).orElseGet(() -> {
            var newCategorie = new Categorie();
            newCategorie.setNom(nom);
            return newCategorie;
        });

        categorie.setSupprimer(false);
        return modelMapper.map(categorieRepository.save(categorie), CategorieDTO.class);
    }

    @Override
    public void deleteCategorie(Long id) throws ProductExistInCategoryException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        var produitIterable = produitService.findProduitByCategorie(categorie);
        if (!produitIterable.iterator().hasNext()) {
            categorie.setSupprimer(true);
            categorieRepository.save(categorie);
        } else
            throw new ProductExistInCategoryException();
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
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
