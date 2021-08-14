package fr.couture.course.services.impl;

import fr.couture.course.entity.ItemListeCoursePreDefined;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.repository.CoursePreDefinedRepository;
import fr.couture.course.services.CoursePreDefinedService;
import fr.couture.course.services.CourseService;
import fr.couture.course.services.ProduitService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CoursePreDefinedServiceImpl implements CoursePreDefinedService {

    private CoursePreDefinedRepository coursePreDefinedRepository;
    private ProduitService produitService;
    private CourseService courseService;

    @Override
    @Transactional(readOnly = true)
    public List<ItemListeCoursePreDefined> findAllPreDefinedListeCourse() {
        return StreamSupport
                .stream(coursePreDefinedRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public ItemListeCoursePreDefined createItemPreDefinedListeCourse(@NonNull Long idProduit, int quantite) throws ProductNotFoundException, ProductInListException {
        var produit = this.produitService.findProduitById(idProduit).orElseThrow(ProductNotFoundException::new);
        if (this.coursePreDefinedRepository.findOneByProduit(produit).isPresent())
            throw new ProductInListException();
        var itemListeCourse = new ItemListeCoursePreDefined();
        itemListeCourse.setProduit(produit);
        itemListeCourse.setQuantite(quantite);
        return this.coursePreDefinedRepository.save(itemListeCourse);
    }

    @Override
    public void deleteItemPreDefinedListeCourse(@NonNull Long idItem) throws ItemListCourseNotFoundException {
        var item = this.coursePreDefinedRepository.findById(idItem).orElseThrow(ItemListCourseNotFoundException::new);
        this.coursePreDefinedRepository.delete(item);
    }

    @Override
    @Transactional(rollbackFor = {ProductInListException.class, ProductNotFoundException.class})
    public void loadPreDefinedListInListeCourse() throws ProductInListException, ProductNotFoundException {
        var itemList = this.findAllPreDefinedListeCourse();
        for (var item : itemList) {
            this.courseService.ajoutProduitListe(item.getProduit().getID(), item.getQuantite());
        }
    }

    @Autowired
    public void setItemListeCoursePreDefinedRepository(CoursePreDefinedRepository coursePreDefinedRepository) {
        this.coursePreDefinedRepository = coursePreDefinedRepository;
    }

    @Autowired
    public void setProduitService(ProduitService produitService) {
        this.produitService = produitService;
    }


    @Autowired
    public void setCourseService(CourseService courseService) {
        this.courseService = courseService;
    }
}
