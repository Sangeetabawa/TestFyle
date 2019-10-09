import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanklistingComponent } from './banklisting.component';

describe('BanklistingComponent', () => {
  let component: BanklistingComponent;
  let fixture: ComponentFixture<BanklistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanklistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanklistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
