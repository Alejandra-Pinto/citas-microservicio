import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingSide } from './branding-side';

describe('BrandingSide', () => {
  let component: BrandingSide;
  let fixture: ComponentFixture<BrandingSide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandingSide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandingSide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
