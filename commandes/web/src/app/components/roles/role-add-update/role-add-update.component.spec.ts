import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddUpdateComponent } from './role-add-update.component';

describe('RoleAddUpdateComponent', () => {
  let component: RoleAddUpdateComponent;
  let fixture: ComponentFixture<RoleAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
