import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoYourTeeComponent } from './do-your-tee.component';

describe('DoYourTeeComponent', () => {
  let component: DoYourTeeComponent;
  let fixture: ComponentFixture<DoYourTeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoYourTeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoYourTeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
