import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HabitantProfileService } from '../../Services/habitant-profile.service';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";


@Component({
  selector: 'app-habitant-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class  HabitantHomeComponent implements OnInit  {
  constructor(private habitantProfileService: HabitantProfileService) {
    console.log('home component initialized');

}

ngOnInit(): void {
  console.log('home component initialized');
  this.habitantProfileService.getProfile().subscribe(data => {
    console.log('Profile Data:', data);
  });
}

}
