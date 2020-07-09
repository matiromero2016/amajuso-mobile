import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.class';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-article-detail-card',
  templateUrl: './article-detail-card.component.html',
  styleUrls: ['./article-detail-card.component.scss'],
})
export class ArticleDetailCardComponent implements OnInit {

  article : Article;
  constructor(private modalCtrl :ModalController ) { }

  ngOnInit() {
        console.log(this.article.getDateFormated());
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

}
