import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComentariosComponent } from './layout-comentarios.component';

describe('LayoutComentariosComponent', () => {
  let component: LayoutComentariosComponent;
  let fixture: ComponentFixture<LayoutComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComentariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
