import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonButton, IonSelectOption, IonSelect,IonIcon, IonCol, IonRow, IonInput, IonItem, 
  IonLabel, IonBackButton, IonButtons, IonNote
 } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cubeOutline, lockClosedOutline, logoApple, logoGoogle, mailOutline, personAdd, personOutline, shieldCheckmarkOutline, eyeOutline } from 'ionicons/icons';
import { RegisterService } from 'src/app/services/register/register-service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { RequestUser } from 'src/app/models/request-user';
import { UserResponse } from 'src/app/models/user-response';
import { AuthService } from 'src/app/services/auth/auth-service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule,
    IonButton, IonSelectOption, IonSelect,IonIcon, IonCol, IonRow, IonInput, IonItem,
    IonLabel, IonBackButton, IonButtons, IonNote, RouterLink
  ]
})
export class RegisterPage implements OnInit {
  registerService = inject(RegisterService);
  authService = inject(AuthService);
  
    
registerForm: FormGroup;
  showPass = false;
  showConfirmPass = false;
  

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private router: Router
  
  ) {
    this.registerForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    addIcons({personAdd,personOutline,mailOutline,lockClosedOutline,eyeOutline,shieldCheckmarkOutline,logoGoogle,logoApple,cubeOutline});
  
  }

  ngOnInit() {}

  // Validateur personnalisé pour la correspondance des mots de passe
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value 
      ? { passwordMismatch: true } : null;
  }

  async onRegister() {
    if (this.registerForm.valid) {
      //construire le user request
      const userRequest: RequestUser = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };
      // Logique d'appel API ici
      this.registerService.register(userRequest).subscribe({
        next: async (response: UserResponse) => {
          const toast = await this.toastCtrl.create({
            message: 'Inscription réussie 🎉 Vous pouvez maintenant vous connecter.',
            duration: 2000,
            color: 'success',
            position: 'top'
          });
          await toast.present();

          setTimeout(() => {
            this.router.navigateByUrl('/login', { replaceUrl: true });
          }, 2000);
        },
        error: (error) => {
          console.error('Erreur lors de linscription :', error);
        }}
      );
    } else {
      this.presentToast('Veuillez vérifier les informations saisies.');
    }
  }

  async presentToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    toast.present();
  }

}
