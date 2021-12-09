import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionDetailsComponent } from './edition-details.component';

describe('EditionDetailsComponent', () => {
  let component: EditionDetailsComponent;
  let fixture: ComponentFixture<EditionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
