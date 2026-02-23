import { Component, inject, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons,
  IonCol, IonButton, IonFooter, IonIcon, IonLabel, IonTextarea, IonRow, IonItem, IonInput,
  ModalController
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline, checkmark, home, briefcase, restaurant } from 'ionicons/icons';
import { CategorieService } from 'src/app/services/categorie/categorie-service';
import { ResponseCategorie } from 'src/app/models/response-categorie';
import { ToastController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButtons, IonCol, IonButton, IonFooter, IonIcon, IonLabel, IonTextarea, IonRow, IonItem,
    IonInput, ReactiveFormsModule
  ]
})
export class AddCategoryPage implements OnInit {

  categoryForm: FormGroup;
  
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private categorieService = inject(CategorieService);

  // Listes pour le sélecteur
  icons = [
    { name: 'home', label: 'Home' },
    { name: 'briefcase', label: 'Work' },
    { name: 'restaurant', label: 'Food' }
  ];

  colors = ['#3880ff', '#2dd36f', '#ffc409', '#eb445a', '#a333ec', '#5260ff'];

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    addIcons({ closeOutline, checkmark, home, briefcase, restaurant });
    
    this.categoryForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      icon: ['home', [Validators.required]],
      color: ['#3880ff', [Validators.required]]
    });
  }

  ngOnInit() {}

  // Méthodes pour mettre à jour les valeurs manuellement
  selectIcon(iconName: string) {
    this.categoryForm.patchValue({ icon: iconName });
  }

  selectColor(color: string) {
    this.categoryForm.patchValue({ color: color });
  }

  annuler() {
    this.navCtrl.back();
    console.log('Annuler');
    }

  async onSave() {
    if (this.categoryForm.valid) {
      const requestCategorie = 
        { libelle: this.categoryForm.value.libelle};
      this.categorieService.addCategorie(requestCategorie).subscribe({
        next: async (response: ResponseCategorie) => {
          const toast = await this.toastCtrl.create({
            message: "Categorie ajouté !!",
            duration: 1500,
            position: 'top',
            color: 'success'
          });
          await toast.present();

          //remettre la valeur des champs à vide
          this.categoryForm.reset();
          console.log(response.id);
          this.navCtrl.back();

        },
        error: async (error: any) => {
          console.error('Erreur lors de l\'ajout de la catégorie:', error);
          const toast = await this.toastCtrl.create({
            message: error.error,
            duration: 1500,
            position: 'top',
            color: 'danger'
          });
          await toast.present();
        }
      })
    }
  }

}
