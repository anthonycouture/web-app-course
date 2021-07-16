package fr.couture.course.exceptions;

public class CategoryNotFoundException extends Exception {

    public CategoryNotFoundException() {
        super("La catégorie n'existe pas");
    }
}
