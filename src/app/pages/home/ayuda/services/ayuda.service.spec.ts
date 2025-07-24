import { TestBed } from '@angular/core/testing';

import { AyudaService } from './ayuda.service';

describe('AyudaService', () => {
  let service: AyudaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyudaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
