import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProductosComponent } from './layout-productos.component';

describe('LayoutProductosComponent', () => {
  let component: LayoutProductosComponent;
  let fixture: ComponentFixture<LayoutProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutProductosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
