import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOutputListComponent } from './search-output-list.component';

describe('SearchOutputListComponent', () => {
  let component: SearchOutputListComponent;
  let fixture: ComponentFixture<SearchOutputListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOutputListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchOutputListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
