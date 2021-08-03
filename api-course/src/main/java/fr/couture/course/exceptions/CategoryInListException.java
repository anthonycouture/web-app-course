package fr.couture.course.exceptions;

public class CategoryInListException extends Exception {

    public CategoryInListException() {
        super("La catégorie est utilisé dans la liste de course");
    }
}
