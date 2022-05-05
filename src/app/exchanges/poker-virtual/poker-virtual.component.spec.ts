import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerVirtualComponent } from './poker-virtual.component';

describe('PokerVirtualComponent', () => {
  let component: PokerVirtualComponent;
  let fixture: ComponentFixture<PokerVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokerVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokerVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
