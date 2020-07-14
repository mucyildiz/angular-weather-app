import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherdisplayComponent } from './weatherdisplay.component';

describe('WeatherdisplayComponent', () => {
  let component: WeatherdisplayComponent;
  let fixture: ComponentFixture<WeatherdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
