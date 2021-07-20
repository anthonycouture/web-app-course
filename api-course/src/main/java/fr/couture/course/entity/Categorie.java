package fr.couture.course.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
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

    @OneToMany(orphanRemoval = true, mappedBy = "categorie")
    private List<Produit> produits = List.of();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Categorie categorie = (Categorie) o;
        return Objects.equals(ID, categorie.ID) && Objects.equals(nom, categorie.nom) && Objects.equals(supprimer, categorie.supprimer) && Objects.equals(produits, categorie.produits);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, nom, supprimer, produits);
    }
}
