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

    @Column(nullable = false)
    private Boolean supprimer = false;

    @ManyToOne(optional = false)
    private Categorie categorie;
}
