import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogEditProduitComponent} from './dialog-edit-produit.component';

describe('DialogEditProduitComponent', () => {
  let component: DialogEditProduitComponent;
  let fixture: ComponentFixture<DialogEditProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditProduitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
