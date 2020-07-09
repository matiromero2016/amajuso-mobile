import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  // URLFacebook;
  
  constructor(private menuCtrl : MenuController) {
  }
  ngOnInit(): void {
    // this.URLTwitter = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:44359/api/twitter");
    // this.URLFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_URL + "/api/facebook");
    this.menuCtrl.enable(true, 'mainMenu');
    // this.menuCtrl.open();
  }
  
  ionViewWillEnter() {
    
    
		
	}
}
