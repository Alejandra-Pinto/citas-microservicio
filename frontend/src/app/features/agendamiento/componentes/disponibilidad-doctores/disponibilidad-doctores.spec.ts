import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadDoctores } from './disponibilidad-doctores';

describe('DisponibilidadDoctores', () => {
  let component: DisponibilidadDoctores;
  let fixture: ComponentFixture<DisponibilidadDoctores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisponibilidadDoctores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadDoctores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
