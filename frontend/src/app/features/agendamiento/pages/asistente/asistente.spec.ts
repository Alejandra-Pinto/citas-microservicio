import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteComponent } from './asistente';

describe('Asistente', () => {
  let component: AsistenteComponent;
  let fixture: ComponentFixture<AsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
