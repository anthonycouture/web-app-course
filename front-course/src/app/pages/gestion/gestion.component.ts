import {Component, OnInit} from '@angular/core';
import {ProduitService} from "../../services/produit.service";

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  constructor(private produitService: ProduitService) {
    this.produitService.getProduits().subscribe(
      (data) => console.log(data),
      (error) => console.error(error)
    );
  }

  ngOnInit(): void {
  }

}
