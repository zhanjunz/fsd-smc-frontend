import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditorDialogComponent } from './company-editor-dialog.component';

describe('CompanyEditorDialogComponent', () => {
  let component: CompanyEditorDialogComponent;
  let fixture: ComponentFixture<CompanyEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
