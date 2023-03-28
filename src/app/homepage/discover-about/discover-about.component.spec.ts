import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverAboutComponent } from './discover-about.component';

describe('DiscoverAboutComponent', () => {
  let component: DiscoverAboutComponent;
  let fixture: ComponentFixture<DiscoverAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
