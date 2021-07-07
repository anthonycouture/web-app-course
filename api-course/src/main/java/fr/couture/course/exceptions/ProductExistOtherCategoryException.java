package fr.couture.course.exceptions;

public class ProductExistOtherCategoryException extends Exception{
    public ProductExistOtherCategoryException() {
        super("Le produit existe dans une autre catégorie");
    }
}
