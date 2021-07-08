package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryIsUseInListException;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.payload.CategorieResponse;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.ListeCourseRepository;
import fr.couture.course.services.CategorieService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Anthony Couture
 *
 * <p>Service permettant de gérer les catégories</p>
 */
@Service
public class CategorieServiceImpl implements CategorieService {

    private CategorieRepository categorieRepository;

    private ListeCourseRepository listeCourseRepository;

    private ModelMapper modelMapper;

    /**
     * Retourne la liste des catégoris actifs
     * @return Liste des catégories actifs
     */
    @Override
    @Transactional
    public List<CategorieResponse> findAllCategorie() {
        return categorieRepository.findAllBySupprimerIsFalse()
                .map(c -> modelMapper.map(c, CategorieResponse.class))
                .collect(Collectors.toList());
    }

    /**
     * Création d'une catégorie
     * @param nom nom de la catégorie
     * @return la catégorie créée ou réactiver à partir du nom passé en paramètre
     */
    @Override
    public CategorieResponse createCategorie(String nom) {
        var categorie = categorieRepository.findCategorieByNom(nom).orElseGet(() -> {
            var newCategorie = new Categorie();
            newCategorie.setNom(nom);
            return newCategorie;
        });

        categorie.setSupprimer(false);
        return modelMapper.map(categorieRepository.save(categorie), CategorieResponse.class);
    }

    /**
     * Supprime une catégorie
     * @param id id de la catégorie à supprimer
     * @throws CategoryIsUseInListException impossible de supprimer une catégorie si elle est utilisé par la liste
     * @throws CategoryNotFoundException impossible de supprimer une catégorie si elle n'existe pas
     *
     * Supprime la catégorie dont l'id est passé en paramètre
     */
    @Override
    public void deleteCategorie(Long id) throws CategoryIsUseInListException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(id).orElseThrow(CategoryNotFoundException::new);
        var produitIterable = listeCourseRepository.findOneByProduit_CategorieIDEquals(id);
        if (produitIterable.isEmpty()) {
            categorie.setSupprimer(true);
            categorieRepository.save(categorie);
        } else
            throw new CategoryIsUseInListException();
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Autowired
    public void setListeCourseRepository(ListeCourseRepository listeCourseRepository) {
        this.listeCourseRepository = listeCourseRepository;
    }
}
