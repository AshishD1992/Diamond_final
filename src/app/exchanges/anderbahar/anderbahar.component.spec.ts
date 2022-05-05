import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnderbaharComponent } from './anderbahar.component';

describe('AnderbaharComponent', () => {
  let component: AnderbaharComponent;
  let fixture: ComponentFixture<AnderbaharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnderbaharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnderbaharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
