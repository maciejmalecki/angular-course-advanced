import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLibComponent } from './app-lib.component';

describe('AppLibComponent', () => {
  let component: AppLibComponent;
  let fixture: ComponentFixture<AppLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
