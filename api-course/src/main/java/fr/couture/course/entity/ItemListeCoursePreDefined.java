package fr.couture.course.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class ItemListeCoursePreDefined implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long ID;

    @OneToOne(optional = false)
    private Produit produit;

    @Column(nullable = false)
    private int quantite = 1;

}
