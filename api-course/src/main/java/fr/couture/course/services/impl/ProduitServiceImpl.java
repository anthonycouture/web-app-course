package fr.couture.course.services.impl;

import fr.couture.course.dto.ProduitDTO;
import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.CategoryNotFoundException;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.repository.CategorieRepository;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.ProduitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProduitServiceImpl implements ProduitService {

    private ProduitRepository produitRepository;
    private CategorieRepository categorieRepository;
    private ModelMapper modelMapper;

    @Override
    public Iterable<Produit> findProduitByCategorie(Categorie categorie) {
        return produitRepository.findAllBySupprimerIsFalseAndCategorieEquals(categorie);
    }

    @Override
    public List<ProduitDTO> findAllProduit() {
        return StreamSupport.stream(produitRepository.findAllBySupprimerIsFalse().spliterator(), false)
                .map(p -> modelMapper.map(p, ProduitDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProduitDTO createProduit(String name, Long idCategorie) throws ProductExistOtherCategoryException, CategoryNotFoundException {
        var categorie = categorieRepository.findById(idCategorie).orElseThrow(CategoryNotFoundException::new);
        var productOptional = produitRepository.findProduitByNom(name);
        if (productOptional.isPresent()) {
            var product = productOptional.get();
            if (!product.getCategorie().equals(categorie) && !product.getSupprimer()) {
                throw new ProductExistOtherCategoryException();
            } else if (product.getCategorie().equals(categorie)) {
                product.setSupprimer(false);
                return modelMapper.map(produitRepository.save(product), ProduitDTO.class);
            }
        }
        var newProduct = new Produit();
        newProduct.setNom(name);
        newProduct.setCategorie(categorie);
        return modelMapper.map(produitRepository.save(newProduct), ProduitDTO.class);
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }

    @Autowired
    public void setCategorieRepository(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @Autowired
    public void setModelMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
}
