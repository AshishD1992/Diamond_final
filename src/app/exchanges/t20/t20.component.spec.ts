import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T20Component } from './t20.component';

describe('T20Component', () => {
  let component: T20Component;
  let fixture: ComponentFixture<T20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T20Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
