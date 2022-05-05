import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixPokerVirtualComponent } from './six-poker-virtual.component';

describe('SixPokerVirtualComponent', () => {
  let component: SixPokerVirtualComponent;
  let fixture: ComponentFixture<SixPokerVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixPokerVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SixPokerVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
