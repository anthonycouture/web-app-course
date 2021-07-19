import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../core/services/produit.service";
import {Produit} from "../../core/models/produit";


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  private _listProduitFull: Produit[] = [];
  listProduiltFiltrer: Produit[] = [];

  listOption: string[] = [];

  constructor(private produitService: ProduitService) {
  }

  ngOnInit(): void {
    this.produitService.getProduits().subscribe(
      (data) => {
        this._listProduitFull = data;
        this.listProduiltFiltrer = data;
        data.forEach(produit => this.listOption.push(produit.nom));
      },
      (error) => console.error(error)
    );
  }

  filterByOption(valueTab: string[]): void {
    this.listProduiltFiltrer = this._listProduitFull.filter(produit => {
      let nomProduit = produit.nom.toLowerCase();
      let responseFilter = false;
      valueTab.forEach(value => {
          if (nomProduit === value.toLowerCase()) {
            responseFilter = true;
            return;
          }
        }
      );
      return responseFilter;
    });
  }
}
