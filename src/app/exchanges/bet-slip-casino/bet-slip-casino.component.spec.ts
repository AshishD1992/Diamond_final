import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSlipCasinoComponent } from './bet-slip-casino.component';

describe('BetSlipCasinoComponent', () => {
  let component: BetSlipCasinoComponent;
  let fixture: ComponentFixture<BetSlipCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetSlipCasinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
