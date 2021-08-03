package fr.couture.course.exceptions;

public class ProductInListException extends Exception {

    public ProductInListException() {
        super("Le produit dans la liste de course");
    }
}
