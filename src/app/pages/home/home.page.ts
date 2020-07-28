import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  // URLFacebook;
  
  constructor(private menuCtrl : MenuController) {
  }
  // ngOnInit(): void {
  //   // this.URLTwitter = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:44359/api/twitter");
  //   // this.URLFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_URL + "/api/facebook");
  //   this.menuCtrl.enable(true, 'mainMenu');
  //   // this.menuCtrl.open();
  // }
  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'mainMenu');
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: {
           lat: 43.0741904,
           lng: -89.3809802
         },
         zoom: 18,
         tilt: 30
       }
    };

    console.log('map options', mapOptions);

    this.map = GoogleMaps.create('map_canvas', mapOptions);

  }
}
