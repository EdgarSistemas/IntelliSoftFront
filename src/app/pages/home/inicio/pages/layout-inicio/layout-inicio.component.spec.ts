import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutInicioComponent } from './layout-inicio.component';

describe('LayoutInicioComponent', () => {
  let component: LayoutInicioComponent;
  let fixture: ComponentFixture<LayoutInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutInicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
