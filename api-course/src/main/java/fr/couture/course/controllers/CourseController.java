package fr.couture.course.controllers;

import fr.couture.course.entity.ItemListeCourse;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ItemListeCourseDTO;
import fr.couture.course.payload.ItemListeCourseNotIdDTO;
import fr.couture.course.services.CourseService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/course")
public class CourseController {

    private CourseService courseService;
    private ModelMapper modelMapper;

    @GetMapping
    public List<ItemListeCourseDTO> getListeCourse() {
        return listItemListeCourseToItemListeCourseDTO(this.courseService.getListeCourse());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemListeCourseDTO addProduitListeCourse(@RequestBody ItemListeCourseNotIdDTO itemListeCourseNotIdDTO) {
        try {
            return itemListeCourseToItemListeCourseDTO(this.courseService.ajoutProduitListe(itemListeCourseNotIdDTO.getIdProduit(), itemListeCourseNotIdDTO.getQuantite()));
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductInListException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @PutMapping
    public ItemListeCourseDTO updateItemList(@RequestBody ItemListeCourseDTO itemListeCourseDTO) {
        try {
            return itemListeCourseToItemListeCourseDTO(this.courseService.updateItemList(itemListeCourseDTO.id, itemListeCourseDTO.getIdProduit(), itemListeCourseDTO.getQuantite()));
        } catch (ItemListCourseNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        } catch (ProductInListException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{idItemListeCourse}")
    public void deleteItemInList(@PathVariable Long idItemListeCourse) {
        try {
            this.courseService.deleteItemInList(idItemListeCourse);
        } catch (ItemListCourseNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    private List<ItemListeCourseDTO> listItemListeCourseToItemListeCourseDTO(List<ItemListeCourse> itemListeCourseList) {
        return itemListeCourseList
                .stream()
                .filter(Objects::nonNull)
                .map(this::itemListeCourseToItemListeCourseDTO)
                .collect(Collectors.toList());
    }

    private ItemListeCourseDTO itemListeCourseToItemListeCourseDTO(ItemListeCourse itemListeCourse) {
        return modelMapper.map(itemListeCourse, ItemListeCourseDTO.class);
    }

    @Autowired
    public void setListeCourseService(CourseService courseService) {
        this.courseService = courseService;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
