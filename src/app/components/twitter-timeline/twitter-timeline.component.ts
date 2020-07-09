import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-twitter-timeline',
  templateUrl: './twitter-timeline.component.html',
  styleUrls: ['./twitter-timeline.component.scss'],
})
export class TwitterTimelineComponent implements OnInit {

  URLTwitter;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.URLTwitter = this.sanitizer.bypassSecurityTrustResourceUrl("https://localhost:44359/api/twitter");
    // this.URLFacebook = this.sanitizer.bypassSecurityTrustResourceUrl(environment.API_URL + "/api/facebook");
    
    // this.menuCtrl.open();
  }
  ngAfterViewInit() {
		const a = function(d,s,id){
			var js: any,
					fjs=d.getElementsByTagName(s)[0],
					p='https';
					js=d.createElement(s);
					js.id=id;
					js.src=p+"://platform.twitter.com/widgets.js";
					fjs.parentNode.insertBefore(js,fjs);
		}
		a(document,"script","twitter-wjs");
	}

}
