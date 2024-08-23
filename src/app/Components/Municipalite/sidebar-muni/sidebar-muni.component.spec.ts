import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarMuniComponent } from './sidebar-muni.component';

describe('SidebarMuniComponent', () => {
  let component: SidebarMuniComponent;
  let fixture: ComponentFixture<SidebarMuniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarMuniComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarMuniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
