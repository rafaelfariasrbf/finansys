/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContasService } from './contas.service';

describe('Service: Usuario', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContasService]
    });
  });

  it('should ...', inject([ContasService], (service: ContasService) => {
    expect(service).toBeTruthy();
  }));
});
