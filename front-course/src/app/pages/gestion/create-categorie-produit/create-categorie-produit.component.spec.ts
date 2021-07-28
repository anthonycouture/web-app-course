import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateCategorieProduitComponent} from './create-categorie-produit.component';

describe('CreateCategorieProduitComponent', () => {
  let component: CreateCategorieProduitComponent;
  let fixture: ComponentFixture<CreateCategorieProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCategorieProduitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategorieProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
