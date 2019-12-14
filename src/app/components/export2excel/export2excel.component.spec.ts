import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Export2excelComponent } from './export2excel.component';

describe('Export2excelComponent', () => {
  let component: Export2excelComponent;
  let fixture: ComponentFixture<Export2excelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Export2excelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Export2excelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
