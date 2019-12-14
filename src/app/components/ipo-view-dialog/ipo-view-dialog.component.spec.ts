import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpoViewDialogComponent } from './ipo-view-dialog.component';

describe('IpoViewDialogComponent', () => {
  let component: IpoViewDialogComponent;
  let fixture: ComponentFixture<IpoViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpoViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpoViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
