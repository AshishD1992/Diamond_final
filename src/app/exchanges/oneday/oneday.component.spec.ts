import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnedayComponent } from './oneday.component';

describe('OnedayComponent', () => {
  let component: OnedayComponent;
  let fixture: ComponentFixture<OnedayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnedayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
