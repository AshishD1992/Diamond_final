import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDownVirtualComponent } from './up-down-virtual.component';

describe('UpDownVirtualComponent', () => {
  let component: UpDownVirtualComponent;
  let fixture: ComponentFixture<UpDownVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpDownVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDownVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
