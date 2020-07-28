import { Component, OnInit } from '@angular/core';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';
import { Observable } from 'rxjs';
import { Youtube } from 'src/app/models/youtube.class';

@Component({
  selector: 'app-youtube-timeline',
  templateUrl: './youtube-timeline.component.html',
  styleUrls: ['./youtube-timeline.component.scss'],
})
export class YoutubeTimelineComponent implements OnInit {

  pageToken;
  videos : Youtube[];

  constructor(private youtubeService : YoutubeService,
              private socialSharing: SocialSharing) {
  }

  ngOnInit(): void {
     this.getVideos();
  }

  getVideos() {
    this.youtubeService.getVideos().subscribe((r) => {
      console.log('data', r);
      this.videos = r.items.map(i=> new Youtube(i.id, i.youtubeId, i.title, i.description, i.imageUrl, new Date(Date.parse(i.publishedAt))));
      // this.pageToken = r.nextPageToken;
      console.log(this.videos);
      // console.log(this.pageToken);
      },
      (err) => console.log(err)
      );
  }

  formatDate(date: string): string {
    let newDate = Date.parse(date);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Intl.DateTimeFormat('es-AR', options).format(newDate);
  }

  shareWhatsapp(video) {
    let url = `https://youtu.be/${video.id.youtubeId}`;
    this.socialSharing.shareViaWhatsApp('Acá va un nuevo video de Amajuso..', null, url);
  }
  shareFacebook(video) {
    let url = `https://youtu.be/${video.id.youtubeId}`;
    this.socialSharing.shareViaFacebook('Acá va un nuevo video de Amajuso..', null, url);
  }
  
}

