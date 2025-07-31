import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutClientecotizacionComponent } from './layout-clientecotizacion.component';

describe('LayoutClientecotizacionComponent', () => {
  let component: LayoutClientecotizacionComponent;
  let fixture: ComponentFixture<LayoutClientecotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutClientecotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutClientecotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
