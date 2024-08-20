import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule, ReactiveFormsModule,RouterLink],
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm: FormGroup;

constructor(
private fb: FormBuilder,
private authService: AuthService,
private router: Router
) {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.minLength(8)]],
});
}

onLogin() {
if (this.loginForm.valid) {
this.authService.login(this.loginForm.value).subscribe({
next: (response) => {
// Stocker les informations de l'utilisateur dans le stockage local
localStorage.setItem('currentUser', JSON.stringify(response));

// Débogage: Afficher la réponse de l'API
console.log('Réponse de l\'API:', response);

// Extraire role_id de la réponse
const roleId = response.user?.role_id;

// Rediriger en fonction du role_id
this.redirectBasedOnRole(roleId);
},
error: (error) => {
// Gérer l'erreur
console.error('Erreur lors de la connexion', error);
}
});
}
}

private redirectBasedOnRole(role_id: number) {
switch (role_id) {
case 1:
this.router.navigate(['/sidebar/dashboard']);
break;
case 2:
this.router.navigate(['/someOtherPathForRole2']); // Assurez-vous que ce chemin est correct
break;
case 3:
this.router.navigate(['/someOtherPathForRole3']); // Assurez-vous que ce chemin est correct
break;
default:
console.error('Rôle inconnu');
this.router.navigate(['/login']);
}
}
}



