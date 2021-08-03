package fr.couture.course.exceptions;

public class ItemListCourseNotFoundException extends Exception {

    public ItemListCourseNotFoundException() {
        super("L'item de la liste de course n'existe pas");
    }
}
