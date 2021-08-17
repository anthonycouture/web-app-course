package fr.couture.course.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Produit implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long ID;

    @Column(nullable = false, unique = true)
    private String nom;

    @ManyToOne(optional = false)
    private Categorie categorie;

    @OneToOne(cascade = CascadeType.REMOVE, mappedBy = "produit")
    private ItemListeCoursePreDefined itemListeCoursePreDefined;
}
