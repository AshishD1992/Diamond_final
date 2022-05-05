import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T20VirtuallComponent } from './t20-virtuall.component';

describe('T20VirtuallComponent', () => {
  let component: T20VirtuallComponent;
  let fixture: ComponentFixture<T20VirtuallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T20VirtuallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T20VirtuallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
