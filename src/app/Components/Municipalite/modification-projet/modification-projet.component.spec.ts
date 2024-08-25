import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationProjetComponent } from './modification-projet.component';

describe('ModificationProjetComponent', () => {
  let component: ModificationProjetComponent;
  let fixture: ComponentFixture<ModificationProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificationProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModificationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
