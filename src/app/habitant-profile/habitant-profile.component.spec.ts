import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitantProfileComponent } from './habitant-profile.component';

describe('HabitantProfileComponent', () => {
  let component: HabitantProfileComponent;
  let fixture: ComponentFixture<HabitantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitantProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
