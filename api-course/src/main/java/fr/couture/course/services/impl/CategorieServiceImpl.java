package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.services.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    @Override
    public Iterable<Categorie> findAllCategorie() {
        return categorieRepository.findAll();
    }

    @Override
    public Categorie createCategorie(String nom) throws CategoryExistException {
        AtomicReference<Optional<Object>> newCategorie = new AtomicReference<>(Optional.empty());
        if(categorieRepository.findCategorieByNom(nom).isEmpty()) {
            var newCategorie1 = new Categorie();
            newCategorie1.setNom(nom);
            newCategorie.set(Optional.of(newCategorie1));
            return categorieRepository.save(newCategorie1);
        }
        throw new CategoryExistException();
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }
}
