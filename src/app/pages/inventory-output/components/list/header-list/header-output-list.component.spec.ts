import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOutputListComponent } from './header-output-list.component';

describe('HeaderOutputListComponent', () => {
  let component: HeaderOutputListComponent;
  let fixture: ComponentFixture<HeaderOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
