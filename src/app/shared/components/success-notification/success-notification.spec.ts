import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessNotification } from './success-notification';

describe('SuccessNotification', () => {
  let component: SuccessNotification;
  let fixture: ComponentFixture<SuccessNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
