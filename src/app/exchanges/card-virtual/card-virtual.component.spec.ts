import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVirtualComponent } from './card-virtual.component';

describe('CardVirtualComponent', () => {
  let component: CardVirtualComponent;
  let fixture: ComponentFixture<CardVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
