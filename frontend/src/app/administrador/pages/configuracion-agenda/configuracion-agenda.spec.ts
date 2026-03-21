import { ConfiguracionAgenda } from './../../../../../../backend/src/modules/administrador/domain/entities/configuracion-agenda.entity';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ConfiguracionAgenda', () => {
  let component: ConfiguracionAgenda;
  let fixture: ComponentFixture<ConfiguracionAgenda>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracionAgenda]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionAgenda);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
