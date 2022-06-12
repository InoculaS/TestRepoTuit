import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MundarijaComponent } from './mundarija.component';

describe('MundarijaComponent', () => {
  let component: MundarijaComponent;
  let fixture: ComponentFixture<MundarijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MundarijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MundarijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
