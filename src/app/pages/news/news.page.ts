import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, LoadingController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article/article.service';
import { IArticle } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  selectedSegment = 'Noticias';
  loading: HTMLIonLoadingElement;
  // news : IArticle;
  constructor(
    private loadingCtrl : LoadingController,
    private articleService : ArticleService
    ) { 

    }

   ngOnInit() {
  }

  segmentChanged() {
  this.selectedSegment = this.segment.value;
  }

}
