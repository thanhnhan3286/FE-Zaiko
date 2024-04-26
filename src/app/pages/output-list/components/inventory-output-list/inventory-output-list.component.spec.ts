import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryOutputListComponent } from './inventory-output-list.component';

describe('InventoryOutputListComponent', () => {
  let component: InventoryOutputListComponent;
  let fixture: ComponentFixture<InventoryOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
