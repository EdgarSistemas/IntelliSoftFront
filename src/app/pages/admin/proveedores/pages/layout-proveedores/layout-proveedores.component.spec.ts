import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProveedoresComponent } from './layout-proveedores.component';

describe('LayoutProveedoresComponent', () => {
  let component: LayoutProveedoresComponent;
  let fixture: ComponentFixture<LayoutProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
