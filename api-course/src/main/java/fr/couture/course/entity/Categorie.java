package fr.couture.course.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Categorie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long ID;

    @Column(unique = true, nullable = false)
    private String nom;

    @Column(nullable = false)
    private Boolean supprimer = false;

    @OneToMany(orphanRemoval = true, mappedBy = "categorie")
    private List<Produit> produits = List.of();
}
