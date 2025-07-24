import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutProductsComponent } from './layout-products.component';

describe('LayoutProductsComponent', () => {
  let component: LayoutProductsComponent;
  let fixture: ComponentFixture<LayoutProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
