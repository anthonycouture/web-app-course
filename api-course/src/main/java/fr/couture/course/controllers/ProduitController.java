package fr.couture.course.controllers;

import fr.couture.course.dto.ProduitDTO;
import fr.couture.course.repository.ProduitRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/produit")
public class ProduitController {

    private ProduitRepository produitRepository;

    private ModelMapper modelMapper;

    @GetMapping
    public List<ProduitDTO> getProduits() {
        return StreamSupport
                .stream(produitRepository.findAll().spliterator(), false)
                .map(p -> modelMapper.map(p, ProduitDTO.class))
                .collect(Collectors.toList());
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
