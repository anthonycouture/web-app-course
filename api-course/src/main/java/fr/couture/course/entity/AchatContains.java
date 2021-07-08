package fr.couture.course.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.OneToOne;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class AchatContains {

    @OneToOne(optional = false)
    private Produit produit;

    @Column(nullable = false)
    private int quantite;
}
