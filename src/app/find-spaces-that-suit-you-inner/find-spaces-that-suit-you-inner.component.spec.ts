import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSpacesThatSuitYouInnerComponent } from './find-spaces-that-suit-you-inner.component';

describe('FindSpacesThatSuitYouInnerComponent', () => {
  let component: FindSpacesThatSuitYouInnerComponent;
  let fixture: ComponentFixture<FindSpacesThatSuitYouInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSpacesThatSuitYouInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSpacesThatSuitYouInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
