package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistInCategoryException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.services.CategorieService;
import fr.couture.course.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    private ProduitService produitService;

    @Override
    public Iterable<Categorie> findAllCategorie() {
        return categorieRepository.findAllBySupprimerIsFalse();
    }

    @Override
    public Categorie createCategorie(String nom) throws CategoryExistException {
        var response = new AtomicReference<Optional<Categorie>>(Optional.empty());
        categorieRepository.findCategorieByNom(nom).ifPresentOrElse(
                (c) -> {
                    if(c.getSupprimer()){
                        c.setSupprimer(false);
                        response.set(Optional.of(categorieRepository.save(c)));
                    }
                },
                () -> {
                    var newCategorie = new Categorie();
                    newCategorie.setNom(nom);
                    response.set(Optional.of(categorieRepository.save(newCategorie)));
                }
        );
        return response.get().orElseThrow(CategoryExistException::new);
    }

    @Override
    public void deleteCategorie(Long id) throws ProductExistInCategoryException {
        var isOk = new AtomicBoolean(false);
        categorieRepository.findById(id).ifPresent( c -> {
            var produitIterable = produitService.findProduitByCategorie(c);
            if(!produitIterable.iterator().hasNext()) {
                c.setSupprimer(true);
                categorieRepository.save(c);
                isOk.set(true);
            }
        });
        if(!isOk.get())
            throw new ProductExistInCategoryException();
    }

    @Override
    public Categorie getCategorieById(Long id) throws CategoryNotFoundException {
        return categorieRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }
}
