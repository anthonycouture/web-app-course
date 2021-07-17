import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListGestionCategorieProduitComponent} from './list-gestion-categorie-produit.component';

describe('ListGestionCategorieProduitComponent', () => {
  let component: ListGestionCategorieProduitComponent;
  let fixture: ComponentFixture<ListGestionCategorieProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListGestionCategorieProduitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGestionCategorieProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
