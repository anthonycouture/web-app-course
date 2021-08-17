import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListeCousePredefinedComponent} from './liste-couse-predefined.component';

describe('ListeCousePredefinedComponent', () => {
  let component: ListeCousePredefinedComponent;
  let fixture: ComponentFixture<ListeCousePredefinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeCousePredefinedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCousePredefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
