import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonBackButton, IonIcon, IonList, IonListHeader, IonInput, IonLabel, IonFooter, IonButton,
  IonBadge, IonAvatar, IonImg, IonItemSliding, IonSearchbar,
  IonItem, IonItemOption, IonItemOptions
 } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { addCircle, pencilSharp, trash } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResponseCategorie } from '../models/response-categorie';
import { CategorieService } from '../services/categorie/categorie-service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent,
     IonButtons, IonBackButton, IonIcon, IonList, IonListHeader, 
     IonItem, IonInput, IonLabel, IonFooter, IonButton, IonBadge, 
     IonAvatar, IonImg, IonItemSliding, IonSearchbar, IonItem, IonItemOption, IonItemOptions,
    CommonModule]
})
export class Tab2Page implements OnInit {
  private categorieService = inject(CategorieService)
  categories: ResponseCategorie[] = []
  constructor(private router: Router) {
    addIcons({
      addCircle,
      trash,
      pencilSharp
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ionViewWillEnter() {
    console.log('IonViewWillEnter called');
    this.getCategories();
  }

  addCategory() {
    this.router.navigate(['/tabs/tab2/add-category']);
  }

  //recuperer toutes les categories
  getCategories() {
    this.categorieService.getAll().subscribe({
      next: (response: ResponseCategorie[]) => {
        this.categories = response;
        console.log("Les categories", this.categories)
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    })
  }

  //supprimer une categorie
  deleteCategory(libelle: string) {
    this.categorieService.deleteCategorie(libelle).subscribe({
      next: (response: ResponseCategorie) => {
        console.log("Categorie supprimée:", response);
        this.getCategories();
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression de la catégorie:', error);
      }
    })
  }

}
