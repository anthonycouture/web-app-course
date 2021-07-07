package fr.couture.course.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Categorie categorie = (Categorie) o;
        return Objects.equals(ID, categorie.ID) && Objects.equals(nom, categorie.nom) && Objects.equals(supprimer, categorie.supprimer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, nom, supprimer);
    }
}
