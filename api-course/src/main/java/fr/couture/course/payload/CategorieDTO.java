package fr.couture.course.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategorieDTO {

    private Long id;
    private String nom;

    private List<ProduitDTO> produits;
}
