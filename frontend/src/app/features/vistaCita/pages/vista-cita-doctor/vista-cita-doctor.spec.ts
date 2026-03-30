import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCitaDoctor } from './vista-cita-doctor';

describe('VistaCitaDoctor', () => {
  let component: VistaCitaDoctor;
  let fixture: ComponentFixture<VistaCitaDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCitaDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCitaDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
