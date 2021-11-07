import { TestBed } from '@angular/core/testing';

import { NetworkDriveService } from './network-drive.service';

describe('NetworkDriveService', () => {
  let service: NetworkDriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkDriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
