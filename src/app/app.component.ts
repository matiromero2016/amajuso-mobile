import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public pages = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.initializeApp();
  }

 async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (!this.authService.getToken()) {
        this.router.navigate(['/login']);
      }
    this.loadPages();
    });
  }

 async loadPages() {
    this.pages = [
      {
        title: 'Home', 
        url: 'home',
        icon: 'home-outline'
      },
      
      {
        title: 'Notícias', 
        url: 'news',
        icon: 'newspaper-outline'
      },
      {
        title: 'Login', 
        url: 'login',
        icon: 'person-circle'
      }
    ];

    if (this.userService.isAdmin()) {
      this.pages.splice(2, 0, {
        title: 'Crear artículo', 
        url: 'create-article',
        icon: 'newspaper-outline'
      });
    }
  };
  
}
