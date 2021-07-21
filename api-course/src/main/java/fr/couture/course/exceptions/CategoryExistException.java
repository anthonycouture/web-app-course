package fr.couture.course.exceptions;

public class CategoryExistException extends Exception {
    public CategoryExistException() {
        super("La catégorie exsite");
    }
}
