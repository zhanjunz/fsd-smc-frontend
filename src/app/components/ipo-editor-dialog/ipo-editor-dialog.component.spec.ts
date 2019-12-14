import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoEditorDialogComponent } from './ipo-editor-dialog.component';

describe('IpoEditorDialogComponent', () => {
  let component: IpoEditorDialogComponent;
  let fixture: ComponentFixture<IpoEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
