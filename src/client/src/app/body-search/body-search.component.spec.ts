import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySearchComponent } from './body-search.component';

describe('BodySearchComponent', () => {
  let component: BodySearchComponent;
  let fixture: ComponentFixture<BodySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
