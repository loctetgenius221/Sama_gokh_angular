import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-projet',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './detail-projet.component.html',
  styleUrl: './detail-projet.component.css'
})
export class DetailProjetComponent {
  

}
