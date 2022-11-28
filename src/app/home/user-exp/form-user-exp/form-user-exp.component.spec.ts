import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUserExpComponent } from './form-user-exp.component';

describe('FormUserExpComponent', () => {
  let component: FormUserExpComponent;
  let fixture: ComponentFixture<FormUserExpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUserExpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUserExpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
