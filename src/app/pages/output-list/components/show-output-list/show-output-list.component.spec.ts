import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOutputListComponent } from './show-output-list.component';

describe('ShowOutputListComponent', () => {
  let component: ShowOutputListComponent;
  let fixture: ComponentFixture<ShowOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
