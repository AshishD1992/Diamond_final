import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuflisComponent } from './muflis.component';

describe('MuflisComponent', () => {
  let component: MuflisComponent;
  let fixture: ComponentFixture<MuflisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuflisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MuflisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
