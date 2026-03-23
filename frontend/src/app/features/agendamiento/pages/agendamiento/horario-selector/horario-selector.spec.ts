import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioSelector } from './horario-selector';

describe('HorarioSelector', () => {
  let component: HorarioSelector;
  let fixture: ComponentFixture<HorarioSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
