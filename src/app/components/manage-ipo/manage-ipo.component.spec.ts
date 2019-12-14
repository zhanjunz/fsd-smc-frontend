import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIpoComponent } from './manage-ipo.component';

describe('ManageIpoComponent', () => {
  let component: ManageIpoComponent;
  let fixture: ComponentFixture<ManageIpoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageIpoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
