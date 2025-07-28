import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCotizacionComponent } from './layout-cotizacion.component';

describe('LayoutCotizacionComponent', () => {
  let component: LayoutCotizacionComponent;
  let fixture: ComponentFixture<LayoutCotizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCotizacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
