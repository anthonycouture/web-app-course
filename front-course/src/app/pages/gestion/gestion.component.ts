import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../core/services/produit.service";
import {Produit} from "../../core/models/produit";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  listProduit: Produit[] = [];
  listOption: string[] = [];

  constructor(private produitService: ProduitService) {
  }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      (data) => {
        this.listProduit = data;
        data.forEach(produit => this.listOption.push(produit.nom));
      },
      (error) => console.error(error)
    );
  }

  filterByOption(valueTab: string[]): void {
    this.listProduit = this.listProduit.filter(produit => {
      let nomProduit = produit.nom.toLowerCase();
      let responseFilter = false;
      valueTab.forEach(value => {
          if (nomProduit === value.toLowerCase())
            responseFilter = true;
        }
      )
      return responseFilter;
    });
  }
}
