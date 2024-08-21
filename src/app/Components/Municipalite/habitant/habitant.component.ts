import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici

@Component({
  selector: 'app-habitant',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './habitant.component.html',
  styleUrl: './habitant.component.css'
})
export class HabitantComponent {
  habitants = [
    { id: '1', nom: 'Sagna', prenom: 'Moussa', email: 'sagna@gmail.com' },
    { id: '2', nom: 'Diop', prenom: 'Aissatou', email: 'diop@gmail.com' }
  ];

  constructor(private router: Router) {}

  voirDetails(id: number): void {
    this.router.navigate(['/habitant/detail/habitant',id]);
  }

}
