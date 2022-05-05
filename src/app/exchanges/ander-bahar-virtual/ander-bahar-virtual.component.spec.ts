import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnderBaharVirtualComponent } from './ander-bahar-virtual.component';

describe('AnderBaharVirtualComponent', () => {
  let component: AnderBaharVirtualComponent;
  let fixture: ComponentFixture<AnderBaharVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnderBaharVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnderBaharVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
