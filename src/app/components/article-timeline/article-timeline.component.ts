import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSegment, LoadingController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article/article.service';
import { ICategory } from 'src/app/interfaces/category.interface';
import { Article } from 'src/app/models/article.class';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-article-timeline',
  templateUrl: './article-timeline.component.html',
  styleUrls: ['./article-timeline.component.scss'],
})
export class ArticleTimelineComponent implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  articles : Article[] = [];
  categories : ICategory[];
  selectedSegment;
  constructor(
    private articleService : ArticleService,
    private loadingCtrl : LoadingController) { }

  ngOnInit() {
    this.getCategories();
    // this.getArticles();
  }

  async getCategories() {
    this.articleService.getAllCategories()
      .subscribe((data) => {
        this.categories = data.items; 
        this.selectedSegment = this.categories[0].title;
        this.getArticles(this.categories[0].id);
         console.log(this.categories)},
                 err => console.log("error al recuperar las categorías de noticias..", err)
                );
  }

  async getArticles(categoryId: number) {
    let loading = await this.presentLoading();
    this.articleService.getByCategoryId(categoryId)
        .subscribe(
          (data) => 
            this.articles = data.items.map(x=> new Article(x.id, x.title, x.content, new Date(Date.parse(x.created)), x.user, x.category)),
          (error) => console.error("error al recuperar las noticias..", error),
           () => loading.dismiss() );
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      // cssClass: 'my-custom-class',
      spinner:'circles',
      backdropDismiss: false
    });

    await loading.present();
    return loading;
  }

  segmentChanged(event) {
    this.selectedSegment = event.detail.value;
    let categoryId = this.categories.filter(c=> c.title == this.selectedSegment)[0].id;
    this.getArticles(categoryId);

    }

}
