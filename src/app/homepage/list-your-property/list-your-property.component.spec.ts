import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYourPropertyComponent } from './list-your-property.component';

describe('ListYourPropertyComponent', () => {
  let component: ListYourPropertyComponent;
  let fixture: ComponentFixture<ListYourPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYourPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYourPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
