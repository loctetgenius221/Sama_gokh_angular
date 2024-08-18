import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-habitant-home',
  standalone: true,
  imports: [],
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
