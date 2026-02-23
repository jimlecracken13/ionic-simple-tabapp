import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonContent, 
  IonIcon, IonList, IonListHeader, IonLabel, IonItem, IonInput, IonFooter, IonButton,
  IonNote 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pencil, checkmarkCircle, lockClosed, eyeOff, key, save, logOut, radioButtonOff, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth/auth-service';
import { Router } from '@angular/router';
import { ChangePasswordService } from '../services/password/change-password-service';
import { UserResponse } from '../models/user-response';
import { ChangePassword } from '../models/change-password';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, IonHeader, IonToolbar, IonTitle, 
    IonButtons, IonBackButton, IonContent, IonIcon, IonList, IonListHeader, 
    IonLabel, IonItem, IonInput, IonFooter, IonButton, IonNote
  ]
})
export class Tab3Page implements OnInit {
  profileForm: FormGroup;
  fb = inject(FormBuilder);
  authentification = inject(AuthService);
  router = inject(Router);
  changePasswordService = inject(ChangePasswordService);
  currentUser!: UserResponse;
  showPassword: boolean = false;
  toastController = inject(ToastController);

  constructor() {
    addIcons({ pencil, checkmarkCircle, lockClosed, eyeOffOutline, eyeOutline, key, save, logOut, radioButtonOff });

    this.profileForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])/) // Nombre + Caractère spécial
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { 
      validators: this.passwordMatchValidator // Validateur de correspondance
    });
  }

  async ngOnInit() {
    console.log('Initializing Tab3Page...');
    //get the current user
    this.currentUser = await this.authentification.getUser();
    console.log(this.currentUser);
  }

  // Validateur pour vérifier si les deux mots de passe correspondent
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPass = control.get('newPassword');
    const confirmPass = control.get('confirmPassword');
    
    if (newPass && confirmPass && newPass.value !== confirmPass.value) {
      confirmPass.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  updateProfile() {
    if (this.profileForm.valid) {
      //creer la données
      const changePassword: ChangePassword = {
        email: this.currentUser.email,
        oldPassword: this.profileForm.value.oldPassword,
        newPassword: this.profileForm.value.newPassword
      }
      this.changePasswordService.changePassword(changePassword).subscribe({
        next:async (data) => {
          console.log('Mise à jour réussie:', data);
          const toast = await this.toastController.create({
            message: 'Mise à jour réussie',
            duration: 2000,
            color: 'success',
            position: 'bottom'
          });
          await toast.present();
          this.profileForm.reset();
        },
        error:async (err) => {
          console.error('Erreur de mise à jour:', err);
          const toast = await this.toastController.create({
            message: err.error,
            duration: 2000,
            color: 'danger',
            position: 'bottom'
          });
          await toast.present();
        }
      });
      console.log('Mise à jour avec:', this.profileForm.value);
    }
  }

  logout() {
     console.log('Logging out...');

    this.authentification.logout();

    //rediriger vers la page de login

    this.router.navigateByUrl('/login');



  }
   togglePassword() {
    this.showPassword = !this.showPassword;
  }
}