import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutRegisterComponent } from './layout-register.component';

describe('LayoutRegisterComponent', () => {
  let component: LayoutRegisterComponent;
  let fixture: ComponentFixture<LayoutRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
