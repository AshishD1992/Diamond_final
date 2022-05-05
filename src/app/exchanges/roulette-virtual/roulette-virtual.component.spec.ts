import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouletteVirtualComponent } from './roulette-virtual.component';

describe('RouletteVirtualComponent', () => {
  let component: RouletteVirtualComponent;
  let fixture: ComponentFixture<RouletteVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouletteVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouletteVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
