import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyViewDialogComponent } from './company-view-dialog.component';

describe('CompanyViewDialogComponent', () => {
  let component: CompanyViewDialogComponent;
  let fixture: ComponentFixture<CompanyViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
