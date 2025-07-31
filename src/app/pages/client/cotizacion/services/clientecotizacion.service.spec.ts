import { TestBed } from '@angular/core/testing';

import { ClientecotizacionService } from './clientecotizacion.service';

describe('ClientecotizacionService', () => {
  let service: ClientecotizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientecotizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
