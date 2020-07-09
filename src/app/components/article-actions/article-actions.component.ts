import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html',
  styleUrls: ['./article-actions.component.scss'],
})
export class ArticleActionsComponent implements OnInit {

  articleId: number;
  constructor(private navParams: NavParams, private popoverCtrl: PopoverController) {

   }

  ngOnInit() {
    this.articleId = this.navParams.get('articleId');
  }

  closePopover() {
    this.popoverCtrl.dismiss();
  }

}
