import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { IonicStorageModule } from '@ionic/storage-angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Drivers } from '@ionic/storage';
import { authInterceptor } from './app/interceptors/auth/auth-interceptor';
import { IonicModule } from '@ionic/angular';
bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

   provideHttpClient(
      withInterceptors([authInterceptor])
    ),
  
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__inventory_db',
        driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
      })
    ),
 
    importProvidersFrom(IonicModule.forRoot({})),
    
  ],
}).catch(err => console.error(err));;

