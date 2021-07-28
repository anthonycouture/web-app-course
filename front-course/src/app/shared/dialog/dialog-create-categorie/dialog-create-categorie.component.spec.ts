import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateCategorieComponent} from './dialog-create-categorie.component';

describe('DialogCreateCategorieComponent', () => {
  let component: DialogCreateCategorieComponent;
  let fixture: ComponentFixture<DialogCreateCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateCategorieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
