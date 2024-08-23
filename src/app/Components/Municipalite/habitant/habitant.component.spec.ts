import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitantComponent } from './habitant.component';

describe('HabitantComponent', () => {
  let component: HabitantComponent;
  let fixture: ComponentFixture<HabitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
