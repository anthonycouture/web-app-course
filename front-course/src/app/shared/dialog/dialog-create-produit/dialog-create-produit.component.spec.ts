import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateProduitComponent} from './dialog-create-produit.component';

describe('DialogCreateProduitComponent', () => {
  let component: DialogCreateProduitComponent;
  let fixture: ComponentFixture<DialogCreateProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateProduitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
