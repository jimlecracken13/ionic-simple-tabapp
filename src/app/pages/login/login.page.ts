import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonNote, IonIcon, IonButton, IonCol, IonRow, IonLabel, IonCheckbox,
  IonItem, IonInput
 } from '@ionic/angular/standalone';
 import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { eyeOutline, lockClosedOutline, mailOutline, archive, logoGoogle, eyeOffOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth-service';
import { LoginRequest } from 'src/app/models/login-request';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, IonNote, IonIcon,
    IonButton, IonCol, IonRow, IonLabel, IonCheckbox, IonItem, IonInput, RouterLink
  ]
})
export class LoginPage implements OnInit {

 loginForm: FormGroup;
  showPassword = false;
  authService = inject(AuthService);
  private zone = inject(NgZone)

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    // Définition des contrôles avec validations
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    //ajout des icons
    addIcons({archive,mailOutline,lockClosedOutline,logoGoogle,eyeOutline,eyeOffOutline});
  }

  ngOnInit() {}

  async onLogin() {
    if (this.loginForm.valid) {
      console.log('Données de connexion:', this.loginForm.value);
      // Logique de connexion ici
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.authService.login(loginRequest).subscribe({
        next: async (response) => {
          // enregistrer le token et les informations de l'uitilisateur
          await this.authService.saveSession(response.token, response.user);
          console.log('Token:', response.token);
          console.log('Utilisateur:', response.user);
          console.log('Token et utilisateur enregistrés avec succès.');
          //aller vers la page d'accueil
         this.zone.run(() => {
        this.router.navigate(['/tabs']).then(nav => {
          console.log('Navigation réussie ?', nav); // Si nav est false, le guard bloque
        });
      });
        },
        error: (error) => {
          console.error('Erreur de connexion:', error.message);
        }
      })
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Veuillez remplir correctement tous les champs.',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
