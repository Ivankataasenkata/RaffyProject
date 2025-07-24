import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealBoard } from './meal-board';

describe('MealBoard', () => {
  let component: MealBoard;
  let fixture: ComponentFixture<MealBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
