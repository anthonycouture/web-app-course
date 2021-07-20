package fr.couture.course.exceptions;

public class ProductExistException extends Exception {
    public ProductExistException() {
        super("Le produit existe");
    }
}
