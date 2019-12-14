import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartViewDialogComponent } from './chart-view-dialog.component';

describe('ChartViewDialogComponent', () => {
  let component: ChartViewDialogComponent;
  let fixture: ComponentFixture<ChartViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
