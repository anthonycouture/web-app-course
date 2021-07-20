package fr.couture.course.exceptions;

public class CategoryExist extends Exception {
    public CategoryExist() {
        super("La catégorie exsite");
    }
}
