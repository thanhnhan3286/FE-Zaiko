import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleSearchListComponent } from './title-search-list.component';

describe('TitleSearchListComponent', () => {
  let component: TitleSearchListComponent;
  let fixture: ComponentFixture<TitleSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
