import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAddUpdateComponent } from './produit-add-update.component';

describe('ProduitAddUpdateComponent', () => {
  let component: ProduitAddUpdateComponent;
  let fixture: ComponentFixture<ProduitAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
