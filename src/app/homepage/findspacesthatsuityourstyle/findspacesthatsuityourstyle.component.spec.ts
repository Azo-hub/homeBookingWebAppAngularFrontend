import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindspacesthatsuityourstyleComponent } from './findspacesthatsuityourstyle.component';

describe('FindspacesthatsuityourstyleComponent', () => {
  let component: FindspacesthatsuityourstyleComponent;
  let fixture: ComponentFixture<FindspacesthatsuityourstyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindspacesthatsuityourstyleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindspacesthatsuityourstyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
