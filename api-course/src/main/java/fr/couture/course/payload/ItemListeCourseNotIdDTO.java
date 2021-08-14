package fr.couture.course.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemListeCourseNotIdDTO {

    private Long idProduit;

    private Integer quantite;
}
