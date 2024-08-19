import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-habitant-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class  HabitantHomeComponent implements OnInit  {
  constructor() {
}

  ngOnInit(): void {
    console.log('home component initialized');
  }

}
