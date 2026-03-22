import { TestBed } from '@angular/core/testing';

import { Agendamiento } from './agendamiento';

describe('Agendamiento', () => {
  let service: Agendamiento;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Agendamiento);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
