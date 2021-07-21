package fr.couture.course.exceptions;

public class ProductIsUseInListException extends Exception {

    public ProductIsUseInListException() {
        super("Le produit est utilisé dans la liste de course");
    }
}
