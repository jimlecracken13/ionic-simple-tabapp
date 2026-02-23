import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButtons, IonBackButton, IonIcon, IonList, IonListHeader
  , IonItem, IonInput, IonLabel, IonFooter, IonFabButton, IonButton, IonBadge,
  IonFab, IonAvatar, IonImg, IonItemSliding,
  IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { pencilSharp, trash, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { UserResponse } from '../models/user-response';
import { AuthService } from '../services/auth/auth-service';
import { UserService } from '../services/user/user-service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon, IonList, IonListHeader, 
    IonItem, IonInput, IonLabel, IonFooter, IonFabButton, IonFab, IonButton, IonBadge, IonAvatar, IonImg,
    IonItemSliding, IonSearchbar, CommonModule],
})
export class Tab1Page {
  private userService = inject(UserService);
  private authService = inject(AuthService)
  currentUser!: UserResponse;
  users: UserResponse[] = [];
  constructor() {
    addIcons({
      pencilSharp,
      trashOutline,
      trash
    })
  }
  async ngOnInit() {
    this.currentUser = await this.authService.getUser();
    this.getUsers();
  }


  //recuperer la liste des utlisateurs de la base de données
  async getUsers() {
    this.userService.getAllUsers().subscribe({
      next: async (response: UserResponse[]) => {
        this.users = response;
        console.log("les utilisateurs:", this.users);
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    })
  }
  //
}
