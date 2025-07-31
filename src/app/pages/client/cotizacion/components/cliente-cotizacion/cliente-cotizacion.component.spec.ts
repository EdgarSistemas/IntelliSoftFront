import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCotizacionComponent } from './cliente-cotizacion.component';

describe('ClienteCotizacionComponent', () => {
  let component: ClienteCotizacionComponent;
  let fixture: ComponentFixture<ClienteCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClienteCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClienteCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
