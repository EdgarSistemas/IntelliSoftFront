import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutUsersComponent } from './layout-users.component';

describe('LayoutUsersComponent', () => {
  let component: LayoutUsersComponent;
  let fixture: ComponentFixture<LayoutUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
