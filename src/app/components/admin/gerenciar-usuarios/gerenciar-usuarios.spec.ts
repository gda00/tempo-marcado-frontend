import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarUsuarios } from './gerenciar-usuarios';

describe('GerenciarUsuarios', () => {
  let component: GerenciarUsuarios;
  let fixture: ComponentFixture<GerenciarUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarUsuarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarUsuarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
