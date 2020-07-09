import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly urlApi = 'https://www.googleapis.com/youtube/v3/';
  private readonly apiKey = 'AIzaSyAnRWDsA4PqWcyECql4Sce0-wgu1y1QmkE';
  private readonly channelId = 'UCpWkSug3GeQD_9TTw34NMsg';
  constructor(private http : HttpClient) {

   }

   getLastVideos() {
     return this.http.get(this.urlApi + `search?channelId=${this.channelId}&part=snippet&order=date&key=${this.apiKey}&type=video`)
     .pipe();

   }
   
}
