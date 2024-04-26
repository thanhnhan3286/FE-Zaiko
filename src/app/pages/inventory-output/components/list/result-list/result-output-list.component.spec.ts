import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultOutputListComponent } from './result-output-list.component';

describe('ResultOutputComponent', () => {
  let component: ResultOutputListComponent;
  let fixture: ComponentFixture<ResultOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
