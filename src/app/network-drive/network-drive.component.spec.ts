import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDriveComponent } from './network-drive.component';

describe('NetworkDriveComponent', () => {
  let component: NetworkDriveComponent;
  let fixture: ComponentFixture<NetworkDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
