import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteProduitComponent} from './dialog-delete-produit.component';

describe('DialogDeleteProduitComponent', () => {
  let component: DialogDeleteProduitComponent;
  let fixture: ComponentFixture<DialogDeleteProduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteProduitComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
