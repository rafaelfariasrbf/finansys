import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaLancamentoConsultaContainerComponent } from './categoria-lancamento-consulta-container.component';

describe('CategoriaLancamentoConsultaContainerComponent', () => {
  let component: CategoriaLancamentoConsultaContainerComponent;
  let fixture: ComponentFixture<CategoriaLancamentoConsultaContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaLancamentoConsultaContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaLancamentoConsultaContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
