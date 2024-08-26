import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';  // Importer ReactiveFormsModule ici

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  projectForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value);
      alert('Projet soumis avec succès');
      this.router.navigate(['/home']);
    }
  }
}
