import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProductInListComponent} from './add-product-in-list.component';

describe('AddProductComponent', () => {
  let component: AddProductInListComponent;
  let fixture: ComponentFixture<AddProductInListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductInListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
