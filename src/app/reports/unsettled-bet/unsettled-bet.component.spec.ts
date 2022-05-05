import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsettledBetComponent } from './unsettled-bet.component';

describe('UnsettledBetComponent', () => {
  let component: UnsettledBetComponent;
  let fixture: ComponentFixture<UnsettledBetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsettledBetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsettledBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
