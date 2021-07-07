package fr.couture.course.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ProduitDTO {

    private Long id;

    private String nom;

    private Long categorieId;

    private String categorieNom;
}
