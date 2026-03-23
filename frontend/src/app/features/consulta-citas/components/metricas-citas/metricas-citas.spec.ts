import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricasCitas } from './metricas-citas';

describe('MetricasCitas', () => {
  let component: MetricasCitas;
  let fixture: ComponentFixture<MetricasCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricasCitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricasCitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
