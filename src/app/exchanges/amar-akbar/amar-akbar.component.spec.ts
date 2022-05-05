import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarAkbarComponent } from "./AmarAkbarComponent";

describe('AmarAkbarComponent', () => {
  let component: AmarAkbarComponent;
  let fixture: ComponentFixture<AmarAkbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmarAkbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmarAkbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
