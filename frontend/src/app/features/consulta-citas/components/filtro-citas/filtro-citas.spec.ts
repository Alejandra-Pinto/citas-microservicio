import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCitas } from './filtro-citas';

describe('FiltroCitas', () => {
  let component: FiltroCitas;
  let fixture: ComponentFixture<FiltroCitas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroCitas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCitas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
