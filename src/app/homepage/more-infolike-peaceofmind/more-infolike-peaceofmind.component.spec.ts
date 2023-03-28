import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfolikePeaceofmindComponent } from './more-infolike-peaceofmind.component';

describe('MoreInfolikePeaceofmindComponent', () => {
  let component: MoreInfolikePeaceofmindComponent;
  let fixture: ComponentFixture<MoreInfolikePeaceofmindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreInfolikePeaceofmindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfolikePeaceofmindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
