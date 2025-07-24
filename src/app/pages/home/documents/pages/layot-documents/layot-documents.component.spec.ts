import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayotDocumentsComponent } from './layot-documents.component';

describe('LayotDocumentsComponent', () => {
  let component: LayotDocumentsComponent;
  let fixture: ComponentFixture<LayotDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayotDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayotDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
