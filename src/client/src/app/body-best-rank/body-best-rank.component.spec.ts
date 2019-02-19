import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyBestRankComponent } from './body-best-rank.component';

describe('BodyBestRankComponent', () => {
  let component: BodyBestRankComponent;
  let fixture: ComponentFixture<BodyBestRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyBestRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyBestRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
