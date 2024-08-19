import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitantProfileService } from '../../Services/habitant-profile.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-habitant-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private habitantProfileService: HabitantProfileService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });

    this.loadProfile();
  }

  loadProfile() {
    this.habitantProfileService.getProfile().subscribe((data: any) => {
      this.profileForm.patchValue(data);
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.habitantProfileService.updateProfile(this.profileForm.value).subscribe(() => {
        alert('Profile updated successfully');
      });
    }
  }
}
