import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarAkbarVirtualComponent } from './amar-akbar-virtual.component';

describe('AmarAkbarVirtualComponent', () => {
  let component: AmarAkbarVirtualComponent;
  let fixture: ComponentFixture<AmarAkbarVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmarAkbarVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmarAkbarVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
