import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { IArticle } from 'src/app/interfaces/article.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService{

  constructor(private http : HttpClient,
              private authService: AuthService) {
    super();
  }

  getAllCategories(): Observable<any> {
    let params = new HttpParams()
    .set('page', '1')
    .set('pagesize', '100')
    .set('active', 'true' )

    return this.http.get(environment['API_URL'] + '/api/articlesCategories', {params: params});
    // .pipe(
    //   map(this.extractData),
    //   catchError(this.serviceError)
    // );
  }
  
  getAll(): Observable<any> {

		let params = new HttpParams()
		.set('page', '1')
		.set('pagesize', '50')

    return this.http.get(environment['API_URL'] + '/api/articles', { params: params })
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
      );
  }
  
  getByCategoryId(id:number): Observable<any> {

		let params = new HttpParams()
		.set('page', '1')
    .set('pagesize', '50')
    .set('categoryId', id.toString())

    return this.http.get(environment['API_URL'] + '/api/articles', { params: params });
    // .pipe(
    //   map(this.extractData),
    //   catchError(this.serviceError)
    //   );
  }
  
  addArticle(article) {
    const accessToken = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + accessToken
      })
    };
    let response =this.http.post(environment.API_URL + '/api/articles', article, httpOptions)
			.pipe(
				map(this.extractData),
				catchError(this.serviceError)
				);
				return response;
  }

}
