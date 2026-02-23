import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,
  IonSelectOption, IonSelect, IonLabel, IonItem, IonCol, IonInput, IonButton,
  IonIcon, IonTextarea, IonRow, IonButtons, ModalController
 } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { cameraOutline, checkmark, closeOutline } from 'ionicons/icons';
import { CategorieService } from 'src/app/services/categorie/categorie-service';
import { ResponseCategorie } from 'src/app/models/response-categorie';
import { ProduitService } from 'src/app/services/produit/produit-service';
import { ProduitRequest } from 'src/app/models/produit-request';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.page.html',
  styleUrls: ['./add-produits.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonSelectOption, IonSelect, IonLabel, IonItem, IonCol, IonInput, IonButton, IonIcon, IonTextarea
    , IonRow, IonButtons, ReactiveFormsModule
    , IonRow, IonButtons
  ]
})
export class AddProduitsPage implements OnInit {

  productForm: FormGroup;
  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private categorieService = inject(CategorieService)
  categories: ResponseCategorie[] = [];
  categorieSelectionne: ResponseCategorie | undefined;
  private produitService = inject(ProduitService);

  constructor(private router: Router,
    private toastController: ToastController
  ) {
    addIcons({ cameraOutline, closeOutline, checkmark });
    
    this.productForm = this.fb.group({
      libelle: ['', [Validators.required, Validators.minLength(3)]],
      prixAchat: [0, [Validators.required, Validators.min(0)]],
      prixVente: [0, [Validators.required, Validators.min(0)]],
      quantite: [0, [Validators.required, Validators.min(0)]],
      idCategorie: ['', [Validators.required]],
      codeBar: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    //recuperer toute les categorie
    this.categorieService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        console.log("Les categories", this.categories)
      },
      error: (err) => {
        console.error('There was an error!', err.error);
      }
    })
  }

  dismiss() {
   this.router.navigate(['/tabs/tab4']);
  }

  async onAddProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      console.log('Produit à ajouter:', productData);

      //recuper l'id de la categorie selectionné
      // this.categorieSelectionne = this.categories.find(categorie => 
      //   categorie.id === this.productForm.value.idCategorie);

      const produitData: ProduitRequest = {
        libelle: this.productForm.value.libelle,
        prixAchat: this.productForm.value.prixAchat,
        prixVente: this.productForm.value.prixVente,
        quantite: this.productForm.value.quantite,
        idCategorie: this.productForm.value.idCategorie,
        codeBar: this.productForm.value.codeBar
      };
      this.produitService.addProduit(productData).subscribe({

        next: async (data) => {
          console.log('Produit ajouté:', data);
          const toast = await this.toastController.create({
            message: 'Produit ajouté avec succès',
            duration: 2000,
            position: 'top',
            color: 'success'
          })
          await toast.present();
          this.productForm.reset();
          this.router.navigate(['/tabs/tab4']);
        },
        error: async (error) => {
          console.error('There was an error!', error.error);
          const toast = await this.toastController.create({
            message: error.error,
            duration: 2000,
            position: 'bottom',
            color: 'danger'
          });
          await toast.present();
        }
      })
     
    }
  }

}
