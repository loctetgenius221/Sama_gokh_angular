import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunesByRegionComponent } from './communes-by-region.component';

describe('CommunesByRegionComponent', () => {
  let component: CommunesByRegionComponent;
  let fixture: ComponentFixture<CommunesByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunesByRegionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommunesByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
