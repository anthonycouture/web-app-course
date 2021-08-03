package fr.couture.course.payload;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ItemListeCourseDTO {

    public Long idListeCourse;
    public Long idProduit;
    public Integer quantite;

}
