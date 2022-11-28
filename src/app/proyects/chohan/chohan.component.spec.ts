import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChohanComponent } from './chohan.component';

describe('ChohanComponent', () => {
  let component: ChohanComponent;
  let fixture: ComponentFixture<ChohanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChohanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChohanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
