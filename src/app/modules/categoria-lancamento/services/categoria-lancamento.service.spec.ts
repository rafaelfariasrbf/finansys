import { TestBed } from '@angular/core/testing';

import { CategoriaLancamentoService } from './categoria-lancamento.service';

describe('CategoriaLancamentoService', () => {
  let service: CategoriaLancamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaLancamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
