import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeEditorDialogComponent } from './exchange-editor-dialog.component';

describe('ExchangeEditorDialogComponent', () => {
  let component: ExchangeEditorDialogComponent;
  let fixture: ComponentFixture<ExchangeEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
