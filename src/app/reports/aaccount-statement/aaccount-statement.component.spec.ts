import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaccountStatementComponent } from './aaccount-statement.component';

describe('AaccountStatementComponent', () => {
  let component: AaccountStatementComponent;
  let fixture: ComponentFixture<AaccountStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaccountStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AaccountStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
