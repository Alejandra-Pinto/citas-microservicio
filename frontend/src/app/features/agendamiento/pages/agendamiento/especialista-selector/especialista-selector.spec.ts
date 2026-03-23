import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistaSelector } from './especialista-selector';

describe('EspecialistaSelector', () => {
  let component: EspecialistaSelector;
  let fixture: ComponentFixture<EspecialistaSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialistaSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistaSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
