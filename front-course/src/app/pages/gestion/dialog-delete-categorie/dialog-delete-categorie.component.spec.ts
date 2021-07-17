import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogDeleteCategorieComponent} from './dialog-delete-categorie.component';

describe('DialogDeleteCategorieComponent', () => {
  let component: DialogDeleteCategorieComponent;
  let fixture: ComponentFixture<DialogDeleteCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteCategorieComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
