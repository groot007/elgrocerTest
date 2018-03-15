import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresPopupComponent } from './stores-popup.component';

describe('StoresPopupComponent', () => {
  let component: StoresPopupComponent;
  let fixture: ComponentFixture<StoresPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
