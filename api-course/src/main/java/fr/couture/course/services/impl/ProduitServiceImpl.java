package fr.couture.course.services.impl;

import fr.couture.course.entity.Categorie;
import fr.couture.course.entity.Produit;
import fr.couture.course.exceptions.ProductExistOtherCategoryException;
import fr.couture.course.repository.ProduitRepository;
import fr.couture.course.services.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProduitServiceImpl implements ProduitService {

    private ProduitRepository produitRepository;

    @Override
    public Iterable<Produit> findProduitByCategorie(Categorie categorie) {
        return produitRepository.findAllBySupprimerIsFalseAndCategorieEquals(categorie);
    }

    @Override
    public Produit createProduit(String name, Categorie categorie) throws ProductExistOtherCategoryException {
        var productOptional = produitRepository.findProduitByNom(name);
        if(productOptional.isPresent()) {
            var product = productOptional.get();
            if(!product.getCategorie().equals(categorie) && !product.getSupprimer()) {
                throw new ProductExistOtherCategoryException();
            } else if (product.getCategorie().equals(categorie)){
                product.setSupprimer(false);
                return produitRepository.save(product);
            }
        }
        var newProduct = new Produit();
        newProduct.setNom(name);
        newProduct.setCategorie(categorie);
        return produitRepository.save(newProduct);
    }

    @Autowired
    public void setProduitRepository(ProduitRepository produitRepository) {
        this.produitRepository = produitRepository;
    }
}
