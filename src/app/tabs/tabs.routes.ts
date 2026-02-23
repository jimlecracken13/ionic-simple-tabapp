import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '../guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        children: [
          {
            path: 'add-category',
            loadComponent: () =>
              import('../pages/add-category/add-category.page').then((m) => m.AddCategoryPage),
            canActivate: [authGuard]
          },
          {
            path: '',
            loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
          }
        ],
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3/tab3.page').then( m => m.Tab3Page)
      },
      {
        path: 'tab4',
        children:[
          {
            path: '',
            loadComponent: () =>
              import('../tab4/tab4.page').then((m) => m.Tab4Page),
          },
          {
            path: 'add-produits',
            loadComponent: () =>
              import('../pages/add-produits/add-produits.page').then((m) => m.AddProduitsPage),
            canActivate: [authGuard]
          },
        ]
      },
      
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full',
      },
    ],
  },


];
