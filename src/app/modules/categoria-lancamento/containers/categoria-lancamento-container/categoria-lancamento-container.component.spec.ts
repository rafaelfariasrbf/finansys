import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaLancamentoContainerComponent } from './categoria-lancamento-container.component';

describe('CategoriaLancamentoContainerComponent', () => {
  let component: CategoriaLancamentoContainerComponent;
  let fixture: ComponentFixture<CategoriaLancamentoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaLancamentoContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaLancamentoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
