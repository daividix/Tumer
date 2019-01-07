import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalificarComponent } from './dialog-calificar.component';

describe('DialogCalificarComponent', () => {
  let component: DialogCalificarComponent;
  let fixture: ComponentFixture<DialogCalificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCalificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
