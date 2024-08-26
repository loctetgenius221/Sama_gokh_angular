import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {
  projectForm: FormGroup = this.fb.group({  // Initialisation avec un groupe de formulaires vide
    name: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    budget: ['', [Validators.required, Validators.min(0)]],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    photo: ['']
  });
  projectId?: number;  // Marqué comme potentiellement non défini

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.projectId) {
      this.loadProjectData();
    }
  }

  loadProjectData(): void {
    if (this.projectId !== undefined) {
      this.projectService.getProjectById(this.projectId).subscribe(project => {
        this.projectForm.patchValue(project);
      });
    }
  }

  onSubmit(): void {
    if (this.projectForm.valid && this.projectId) {
      this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe(() => {
        alert('Projet modifié avec succès');
        this.router.navigate(['/home']);
      });
    }
  }
}
