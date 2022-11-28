import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HangedComponent } from './hanged.component';

describe('HangedComponent', () => {
  let component: HangedComponent;
  let fixture: ComponentFixture<HangedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HangedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
