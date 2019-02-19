import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestRankComponent } from './best-rank.component';

describe('BestRankComponent', () => {
  let component: BestRankComponent;
  let fixture: ComponentFixture<BestRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
