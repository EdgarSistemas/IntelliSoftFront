import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutAyudaComponent } from './layout-ayuda.component';

describe('LayoutAyudaComponent', () => {
  let component: LayoutAyudaComponent;
  let fixture: ComponentFixture<LayoutAyudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutAyudaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutAyudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
