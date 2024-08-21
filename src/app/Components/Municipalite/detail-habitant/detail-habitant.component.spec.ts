import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHabitantComponent } from './detail-habitant.component';

describe('DetailHabitantComponent', () => {
  let component: DetailHabitantComponent;
  let fixture: ComponentFixture<DetailHabitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHabitantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailHabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
