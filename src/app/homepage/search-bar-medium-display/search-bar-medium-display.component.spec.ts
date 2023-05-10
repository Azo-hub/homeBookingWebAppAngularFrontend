import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarMediumDisplayComponent } from './search-bar-medium-display.component';

describe('SearchBarMediumDisplayComponent', () => {
  let component: SearchBarMediumDisplayComponent;
  let fixture: ComponentFixture<SearchBarMediumDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBarMediumDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarMediumDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
