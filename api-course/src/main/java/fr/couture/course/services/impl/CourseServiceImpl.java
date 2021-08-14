package fr.couture.course.services.impl;

import fr.couture.course.entity.ItemListeCourse;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.repository.CourseRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.CourseService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CourseServiceImpl implements CourseService {

    private ProduitRepository produitRepository;
    private CourseRepository courseRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ItemListeCourse> getListeCourse() {
        return StreamSupport
                .stream(this.courseRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public ItemListeCourse ajoutProduitListe(@NonNull Long idProduit, int quantite) throws ProductNotFoundException, ProductInListException {
        var produit = this.produitRepository.findById(idProduit).orElseThrow(ProductNotFoundException::new);
        if (this.courseRepository.findItemListeCourseByProduit(produit).isPresent()) {
            throw new ProductInListException();
        }
        var itemListeCourse = new ItemListeCourse();
        itemListeCourse.setProduit(produit);
        itemListeCourse.setQuantite(quantite);
        return this.courseRepository.save(itemListeCourse);
    }

    @Override
    public ItemListeCourse updateItemList(@NonNull Long idItemList, @NonNull Long idProduit, int quantite) throws ItemListCourseNotFoundException, ProductNotFoundException, ProductInListException {
        var itemListeCourse = this.courseRepository.findById(idItemList).orElseThrow(ItemListCourseNotFoundException::new);
        if (!itemListeCourse.getProduit().getID().equals(idProduit)) {
            var produit = this.produitRepository.findById(idProduit).orElseThrow(ProductNotFoundException::new);
            if (this.courseRepository.findItemListeCourseByProduit(produit).isPresent()) {
                throw new ProductInListException();
            }
            itemListeCourse.setProduit(produit);
        }
        itemListeCourse.setQuantite(quantite);
        return this.courseRepository.save(itemListeCourse);
    }

    @Override
    public void deleteItemInList(@NonNull Long idItemList) throws ItemListCourseNotFoundException {
        var itemListeCourse = this.courseRepository.findById(idItemList).orElseThrow(ItemListCourseNotFoundException::new);
        this.courseRepository.delete(itemListeCourse);
    }


    @Autowired
    public void setItemListeCourseRepository(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
}
