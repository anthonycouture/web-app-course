package fr.couture.course.exceptions;

public class ProductInListException extends Exception {

    public ProductInListException() {
        super("Le produit est dans la liste de course");
    }
}
