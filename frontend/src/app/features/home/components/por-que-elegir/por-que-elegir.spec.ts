import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorQueElegir } from './por-que-elegir';

describe('PorQueElegir', () => {
  let component: PorQueElegir;
  let fixture: ComponentFixture<PorQueElegir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PorQueElegir]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PorQueElegir);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
