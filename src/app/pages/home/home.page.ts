import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  
  // URLFacebook;
  
  constructor(private menuCtrl : MenuController) {
  }
  ngOnInit(): void {
    // this.URLTwitter = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:44359/api/twitter");
    // this.URLFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_URL + "/api/facebook");
    this.menuCtrl.enable(true, 'mainMenu');
    // this.menuCtrl.open();
  }
  ngAfterViewInit() {
		const a = function(d,s,id){
			var js: any,
					fjs=d.getElementsByTagName(s)[0],
					p='https';
					js=d.createElement(s);
					js.id=id;
					js.src=p+"://apis.google.com/js/platform.js";
					fjs.parentNode.insertBefore(js,fjs);
		}
		a(document,"script","twitter-wjs");
  }
  
  ionViewWillEnter() {

	}
}
