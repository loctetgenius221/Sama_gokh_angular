import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProjetHabitantComponent } from './detail-projet-habitant.component';

describe('DetailProjetHabitantComponent', () => {
  let component: DetailProjetHabitantComponent;
  let fixture: ComponentFixture<DetailProjetHabitantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailProjetHabitantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailProjetHabitantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
