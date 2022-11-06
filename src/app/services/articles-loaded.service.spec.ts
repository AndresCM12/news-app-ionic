import { TestBed } from '@angular/core/testing';

import { ArticlesLoadedService } from './articles-loaded.service';

describe('ArticlesLoadedService', () => {
  let service: ArticlesLoadedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesLoadedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
