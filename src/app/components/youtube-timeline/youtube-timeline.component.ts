import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-youtube-timeline',
  templateUrl: './youtube-timeline.component.html',
  styleUrls: ['./youtube-timeline.component.scss'],
})
export class YoutubeTimelineComponent implements OnInit {

  pageToken;
  videos : Observable<any>

  constructor(private youtubeService : YoutubeService,
              private socialSharing: SocialSharing) { 
    
  }

  ngOnInit(): void {
     this.getVideos();
  }

  getVideos() {
    this.videos = this.youtubeService.getLastVideos();
    this.videos.subscribe(r=> {
      this.videos = r.items;
      this.pageToken = r.nextPageToken;
      console.log(this.videos);
      console.log(this.pageToken);
      });
  }

  formatDate(date: string): string {
    let newDate = Date.parse(date);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-AR', options).format(newDate);
  }

  shareWhatsapp(video) {
    let url = `https://youtu.be/${video.id.videoId}`;
    this.socialSharing.shareViaWhatsApp('Acá va un nuevo video de Amajuso..', null, url);
    console.log('video', video);
  }

  
}

