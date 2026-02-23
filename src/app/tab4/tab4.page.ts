import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonCard, IonCardContent,
  IonBadge, IonCol, IonRow, IonGrid, IonSearchbar, IonButtons
 } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { watchOutline, optionsOutline, filterOutline, addCircle } from 'ionicons/icons';
import { Router } from '@angular/router';
import { ResponseProduit } from '../models/response-produit';
import { ProduitService } from '../services/produit/produit-service';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonButton,IonCard, IonCardContent, IonBadge, IonIcon, IonCol, IonRow, IonGrid, IonSearchbar,
    IonButtons
  ]
})
export class Tab4Page implements OnInit {

  constructor(private router: Router) {
    addIcons({optionsOutline,filterOutline,addCircle,watchOutline});
  }
  products: ResponseProduit[] = []
  private productService = inject(ProduitService);

  ngOnInit() {
    this.getProducts();
  }
  ionViewWillEnter() {
    this.getProducts();
  }
  addProduct() {
    console.log("ajouter produits page")
    this.router.navigate(['/add-produits']);
  }

  //
  getProducts() {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        console.log("Les produits", this.products)
      },
      error: (err) => {
        console.error('There was an error!', err);
      }
    })
  }


}
