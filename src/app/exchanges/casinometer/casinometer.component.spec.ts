import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasinometerComponent } from './casinometer.component';

describe('CasinometerComponent', () => {
  let component: CasinometerComponent;
  let fixture: ComponentFixture<CasinometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasinometerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasinometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
