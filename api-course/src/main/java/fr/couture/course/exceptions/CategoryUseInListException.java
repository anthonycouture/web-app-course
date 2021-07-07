package fr.couture.course.exceptions;

public class CategoryUseInListException extends Exception{

    public CategoryUseInListException() {
        super("La catégorie est utilisé dans la liste de course");
    }
}
