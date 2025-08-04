import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInsumosComponent } from './layout-insumos.component';

describe('LayoutInsumosComponent', () => {
  let component: LayoutInsumosComponent;
  let fixture: ComponentFixture<LayoutInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutInsumosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
