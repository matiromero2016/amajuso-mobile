import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly urlApi = 'https://www.googleapis.com/youtube/v3/';
  private readonly apiKey = 'AIzaSyAnRWDsA4PqWcyECql4Sce0-wgu1y1QmkE';
  private readonly channelId = 'UCpWkSug3GeQD_9TTw34NMsg';
  constructor(private http : HttpClient) {

   }

   getVideos() : Observable<any> {
    let params = new HttpParams()
    .set('page', '1')
    .set('pagesize', '100')
    
     return this.http.get(environment['API_URL'] + '/api/youtube', {params: params});

   }
   
}
