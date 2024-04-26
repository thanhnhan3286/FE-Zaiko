/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ActualComponent } from './actual.component';

describe('ActualComponent', () => {
  let component: ActualComponent;
  let fixture: ComponentFixture<ActualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
