import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TigerVirtualComponent } from './tiger-virtual.component';

describe('TigerVirtualComponent', () => {
  let component: TigerVirtualComponent;
  let fixture: ComponentFixture<TigerVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TigerVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TigerVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
