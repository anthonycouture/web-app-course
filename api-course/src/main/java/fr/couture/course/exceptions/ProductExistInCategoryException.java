package fr.couture.course.exceptions;

public class ProductExistInCategoryException extends Exception {

    public ProductExistInCategoryException() {
        super("La catégorie contient des produits");
    }
}
