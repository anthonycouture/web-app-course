package fr.couture.course.exceptions;

public class ProductNotFoundException extends Exception {

    public ProductNotFoundException() {
        super("Le produit n'existe pas");
    }
}
