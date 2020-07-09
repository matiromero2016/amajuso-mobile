import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-facebook-timeline',
  templateUrl: './facebook-timeline.component.html',
  styleUrls: ['./facebook-timeline.component.scss'],
})
export class FacebookTimelineComponent implements OnInit {
  
  URLFacebook;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.URLFacebook = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:44359/api/facebook");
  }
  // ngAfterViewInit() {
	// 	const a = function(d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) return;
  //     js = d.createElement(s); js.id = id;
  //     js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v7.0&appId=660953594760795&autoLogAppEvents=1";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }
  //   a(document,"script","facebook-jssdk");
  // }
    // function(d, s, id) {
    //   var js, fjs = d.getElementsByTagName(s)[0];
    //   if (d.getElementById(id)) return;
    //   js = d.createElement(s); js.id = id;
    //   js.src = "//connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v7.0&appId=660953594760795&autoLogAppEvents=1";
    //   fjs.parentNode.insertBefore(js, fjs);
    // }a(document, 'script', 'facebook-jssdk'));
  
  // <script async defer crossorigin="anonymous" src="https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v7.0&appId=660953594760795&autoLogAppEvents=1" nonce="DCn7xpuw"></script>
}
