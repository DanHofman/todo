import { TestBed, inject } from '@angular/core/testing';

import { PullTodoService } from './pull-todo.service';

describe('PullTodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PullTodoService]
    });
  });

  it('should ...', inject([PullTodoService], (service: PullTodoService) => {
    expect(service).toBeTruthy();
  }));
});
