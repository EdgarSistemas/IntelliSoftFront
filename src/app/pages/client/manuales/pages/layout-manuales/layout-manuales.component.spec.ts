import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutManualesComponent } from './layout-manuales.component';

describe('LayoutManualesComponent', () => {
  let component: LayoutManualesComponent;
  let fixture: ComponentFixture<LayoutManualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutManualesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutManualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
