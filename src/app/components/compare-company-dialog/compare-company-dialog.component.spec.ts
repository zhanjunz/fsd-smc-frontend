import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareCompanyDialogComponent } from './compare-company-dialog.component';

describe('CompareCompanyDialogComponent', () => {
  let component: CompareCompanyDialogComponent;
  let fixture: ComponentFixture<CompareCompanyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareCompanyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareCompanyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
