import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBetCasinoComponent } from './my-bet-casino.component';

describe('MyBetCasinoComponent', () => {
  let component: MyBetCasinoComponent;
  let fixture: ComponentFixture<MyBetCasinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBetCasinoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBetCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
