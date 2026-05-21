import { TestBed } from '@angular/core/testing';

import { Aluguel } from './aluguel';

describe('Aluguel', () => {
  let service: Aluguel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aluguel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
