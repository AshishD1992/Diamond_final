import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetButtonValueComponent } from './set-button-value.component';

describe('SetButtonValueComponent', () => {
  let component: SetButtonValueComponent;
  let fixture: ComponentFixture<SetButtonValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetButtonValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetButtonValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
