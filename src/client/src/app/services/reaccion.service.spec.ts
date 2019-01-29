import { TestBed } from '@angular/core/testing';

import { ReaccionService } from './reaccion.service';

describe('ReaccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReaccionService = TestBed.get(ReaccionService);
    expect(service).toBeTruthy();
  });
});
