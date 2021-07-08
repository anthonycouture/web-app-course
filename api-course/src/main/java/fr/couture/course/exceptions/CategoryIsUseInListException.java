package fr.couture.course.exceptions;

public class CategoryIsUseInListException extends Exception {

    public CategoryIsUseInListException() {
        super("La catégorie est utilisé dans la liste de course");
    }
}
