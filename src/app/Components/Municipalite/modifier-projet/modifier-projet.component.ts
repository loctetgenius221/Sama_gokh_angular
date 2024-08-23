import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modifier-projet',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,RouterLink],
  templateUrl: './modifier-projet.component.html',
  styleUrl: './modifier-projet.component.css'
})
export class ModifierProjetComponent implements OnInit  {
  projetForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("Projet ID:", id); // Assurez-vous que l'ID est bien récupéré
    this.initializeForm();
    this.loadProjetData(id!);
  }

  initializeForm() {
    this.projetForm = this.formBuilder.group({
      nom: [''],
      description: [''],
      dateDebut: [''],
      dateFin: [''],
      statut: [''],
      budget: [''],
      photo: ['']

    });
  }

  
  loadProjetData(id: string) {
    const mockProjet = {
      nom: `Projet avec ID ${id}`,
      description: `Description pour le projet ${id}`,
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31',
      statut: 'Proposé',
      budget: 1000000
    };
    this.projetForm.patchValue(mockProjet);
  }
  

  // Méthode pour annuler et retourner à la liste des projets
  onCancel() {
    this.router.navigate(['/projet']);
  }

  // Méthode pour soumettre le formulaire de modification
  onSubmit() {
    if (this.projetForm.valid) {
      // Logique pour soumettre les modifications (à définir)
      console.log(this.projetForm.value);

      // Redirection vers la liste des projets après soumission
      this.router.navigate(['/projet']);
    }
  }

}
