package fr.couture.course.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProduitResponse {

    private Long id;

    private String nom;

    private CategorieResponse categorie;
}
