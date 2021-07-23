import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectSearchCreateComponent} from './select-search-create.component';

describe('SelectSearchCreateComponent', () => {
  let component: SelectSearchCreateComponent;
  let fixture: ComponentFixture<SelectSearchCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSearchCreateComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
