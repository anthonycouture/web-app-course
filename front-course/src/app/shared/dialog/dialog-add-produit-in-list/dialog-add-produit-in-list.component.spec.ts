import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogAddProduitInListComponent} from './dialog-add-produit-in-list.component';

describe('DialogAddProduitInListComponent', () => {
  let component: DialogAddProduitInListComponent;
  let fixture: ComponentFixture<DialogAddProduitInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAddProduitInListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddProduitInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
