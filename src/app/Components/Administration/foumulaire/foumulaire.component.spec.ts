import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoumulaireComponent } from './foumulaire.component';

describe('FoumulaireComponent', () => {
  let component: FoumulaireComponent;
  let fixture: ComponentFixture<FoumulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoumulaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FoumulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
