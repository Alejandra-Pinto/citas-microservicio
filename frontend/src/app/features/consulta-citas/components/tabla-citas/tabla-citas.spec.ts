import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaCitas } from './tabla-citas';

describe('TablaCitas', () => {
  let component: TablaCitas;
  let fixture: ComponentFixture<TablaCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaCitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaCitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
