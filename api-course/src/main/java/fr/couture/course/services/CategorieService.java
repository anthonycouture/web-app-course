package fr.couture.course.services;

import fr.couture.course.entity.Categorie;
import fr.couture.course.exceptions.CategoryExistException;

public interface CategorieService {

    Iterable<Categorie> findAllCategorie();

    Categorie createCategorie(String nom) throws CategoryExistException;
}
