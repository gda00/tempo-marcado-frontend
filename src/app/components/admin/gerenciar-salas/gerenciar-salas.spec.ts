import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarSalas } from './gerenciar-salas';

describe('GerenciarSalas', () => {
  let component: GerenciarSalas;
  let fixture: ComponentFixture<GerenciarSalas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarSalas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarSalas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
