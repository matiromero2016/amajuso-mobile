import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from 'src/app/interfaces/article.interface';
import { ModalController, PopoverController } from '@ionic/angular';
import { ArticleDetailCardComponent } from '../article-detail-card/article-detail-card.component';
import { Article } from 'src/app/models/article.class';
import { ArticleActionsComponent } from '../../article-actions/article-actions.component';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss'],
})
export class ArticleCardComponent implements OnInit {

  @Input() article : Article;
  modal;
  constructor(private modalCtrl : ModalController, private popoverCtrl: PopoverController) {}

  ngOnInit() {
  }

  async openArticle() {
    this.modal = await this.modalCtrl.create({
			component: ArticleDetailCardComponent,
			componentProps: {
				article: this.article
			}
		});
		
		return this.modal.present();
  }

  async openPopover(ev:any) {
    const popover = await this.popoverCtrl.create({
      component: ArticleActionsComponent,
      componentProps: {
        articleId: this.article.id
      },
      event: ev,
      translucent: true,
      animated:true
    });
    return popover.present();
  }
}
