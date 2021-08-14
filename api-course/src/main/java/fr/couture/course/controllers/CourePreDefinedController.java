package fr.couture.course.controllers;

import fr.couture.course.entity.ItemListeCoursePreDefined;
import fr.couture.course.exceptions.ItemListCourseNotFoundException;
import fr.couture.course.exceptions.ProductInListException;
import fr.couture.course.exceptions.ProductNotFoundException;
import fr.couture.course.payload.ItemListeCourseDTO;
import fr.couture.course.payload.ItemListeCourseNotIdDTO;
import fr.couture.course.services.CoursePreDefinedService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/course-pre-defined")
public class CourePreDefinedController {

    private ModelMapper modelMapper;
    private CoursePreDefinedService coursePreDefinedService;

    @GetMapping
    public List<ItemListeCourseDTO> getPreDefinedListeCourse() {
        return listItemListePreDefinedCourseToItemListeCourseDTO(this.coursePreDefinedService.findAllPreDefinedListeCourse());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ItemListeCourseDTO createItemCoursePreDefined(@RequestBody ItemListeCourseNotIdDTO itemListeCourseNotIdDTO) {
        try {
            return itemListeCoursePreDefinedToItemListeCourseDTO(
                    this.coursePreDefinedService.createItemPreDefinedListeCourse(
                            itemListeCourseNotIdDTO.getIdProduit(),
                            itemListeCourseNotIdDTO.getQuantite()
                    )
            );
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
    public ItemListeCourseDTO updateItemCoursePreDefined(@RequestBody ItemListeCourseDTO itemListeCourseDTO) {
        try {
            return itemListeCoursePreDefinedToItemListeCourseDTO(
                    this.coursePreDefinedService.updateItemPreDefinedListeCourse(itemListeCourseDTO.id, itemListeCourseDTO.getIdProduit(), itemListeCourseDTO.quantite)
            );
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.PRECONDITION_FAILED, e.getMessage(), e);
        } catch (ItemListCourseNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        } catch (ProductInListException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        }
    }

    @DeleteMapping("/{idItemCoursePreDefined}")
    public void deleteItemInPreDefinedList(@PathVariable Long idItemCoursePreDefined) {
        try {
            this.coursePreDefinedService.deleteItemPreDefinedListeCourse(idItemCoursePreDefined);
        } catch (ItemListCourseNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }

    @PostMapping("/load")
    public void loadListPredefinedInListeCourse() {
        try {
            this.coursePreDefinedService.loadPreDefinedListInListeCourse();
        } catch (ProductInListException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, e.getMessage(), e);
        } catch (ProductNotFoundException e) {
            e.printStackTrace();
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, e.getMessage(), e);
        }
    }


    private List<ItemListeCourseDTO> listItemListePreDefinedCourseToItemListeCourseDTO(List<ItemListeCoursePreDefined> itemListeCourseList) {
        return itemListeCourseList
                .stream()
                .filter(Objects::nonNull)
                .map(this::itemListeCoursePreDefinedToItemListeCourseDTO)
                .collect(Collectors.toList());
    }

    private ItemListeCourseDTO itemListeCoursePreDefinedToItemListeCourseDTO(ItemListeCoursePreDefined itemListeCourse) {
        return modelMapper.map(itemListeCourse, ItemListeCourseDTO.class);
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    @Autowired
    public void setCoursePreDefinedService(CoursePreDefinedService coursePreDefinedService) {
        this.coursePreDefinedService = coursePreDefinedService;
    }
}
