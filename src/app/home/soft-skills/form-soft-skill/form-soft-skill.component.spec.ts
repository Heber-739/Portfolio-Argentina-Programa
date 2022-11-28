import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSoftSkillComponent } from './form-soft-skill.component';

describe('FormSoftSkillComponent', () => {
  let component: FormSoftSkillComponent;
  let fixture: ComponentFixture<FormSoftSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSoftSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSoftSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
