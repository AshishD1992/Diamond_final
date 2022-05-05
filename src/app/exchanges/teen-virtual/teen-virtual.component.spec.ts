import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeenVirtualComponent } from './teen-virtual.component';

describe('TeenVirtualComponent', () => {
  let component: TeenVirtualComponent;
  let fixture: ComponentFixture<TeenVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeenVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeenVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
