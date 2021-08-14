package fr.couture.course.services.impl;

import fr.couture.course.entity.ItemListeCoursePreDefined;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.repository.ItemListeCoursePreDefinedRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.CoursePreDefinedService;
import fr.couture.course.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CoursePreDefinedServiceImpl implements CoursePreDefinedService {

    private ItemListeCoursePreDefinedRepository itemListeCoursePreDefinedRepository;
    private ProduitRepository produitRepository;
    private CourseService courseService;

    @Override
    @Transactional(readOnly = true)
    public List<ItemListeCoursePreDefined> findAllPreDefinedListeCourse() {
        return StreamSupport
                .stream(itemListeCoursePreDefinedRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public ItemListeCoursePreDefined createItemPreDefinedListeCourse(Long idProduit, int quantite) throws ProductNotFoundException, ProductInListException {
        var produit = this.produitRepository.findById(idProduit).orElseThrow(ProductNotFoundException::new);
        if (this.itemListeCoursePreDefinedRepository.findOneByProduit(produit).isPresent())
            throw new ProductInListException();
        var itemListeCourse = new ItemListeCoursePreDefined();
        itemListeCourse.setProduit(produit);
        itemListeCourse.setQuantite(quantite);
        return this.itemListeCoursePreDefinedRepository.save(itemListeCourse);
    }

    @Override
    public void deleteItemPreDefinedListeCourse(Long idItem) throws ItemListCourseNotFoundException {
        var item = this.itemListeCoursePreDefinedRepository.findById(idItem).orElseThrow(ItemListCourseNotFoundException::new);
        this.itemListeCoursePreDefinedRepository.delete(item);
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
    public void setItemListeCoursePreDefinedRepository(ItemListeCoursePreDefinedRepository itemListeCoursePreDefinedRepository) {
        this.itemListeCoursePreDefinedRepository = itemListeCoursePreDefinedRepository;
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Autowired
    public void setCourseService(CourseService courseService) {
        this.courseService = courseService;
    }
}
