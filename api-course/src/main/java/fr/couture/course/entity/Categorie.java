package fr.couture.course.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Categorie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long ID;

    @Column(unique = true, nullable = false)
    private String nom;

    @Column(nullable = false)
    private Boolean supprimer = false;
}
