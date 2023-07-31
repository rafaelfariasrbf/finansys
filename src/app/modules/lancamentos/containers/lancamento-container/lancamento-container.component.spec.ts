import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoContainerComponent } from './lancamento-container.component';

describe('CategoriaLancamentoContainerComponent', () => {
  let component: LancamentoContainerComponent;
  let fixture: ComponentFixture<LancamentoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentoContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
