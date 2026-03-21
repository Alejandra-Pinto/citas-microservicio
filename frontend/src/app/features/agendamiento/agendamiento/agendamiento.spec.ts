import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Agendamiento } from './agendamiento';

describe('Agendamiento', () => {
  let component: Agendamiento;
  let fixture: ComponentFixture<Agendamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Agendamiento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Agendamiento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
