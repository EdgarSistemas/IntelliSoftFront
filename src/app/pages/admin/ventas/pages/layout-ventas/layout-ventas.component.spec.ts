import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVentasComponent } from './layout-ventas.component';

describe('LayoutVentasComponent', () => {
  let component: LayoutVentasComponent;
  let fixture: ComponentFixture<LayoutVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
