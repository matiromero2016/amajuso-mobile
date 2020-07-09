import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTimelineComponent } from './article-timeline/article-timeline.component';
import { FacebookTimelineComponent } from './facebook-timeline/facebook-timeline.component';
import { TwitterTimelineComponent } from './twitter-timeline/twitter-timeline.component';
import { Router, RouterModule } from '@angular/router';
import { ArticleCardComponent } from './cards/article-card/article-card.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailCardComponent } from './cards/article-detail-card/article-detail-card.component';
import { YoutubeTimelineComponent } from './youtube-timeline/youtube-timeline.component';



@NgModule({
  declarations: [
    ArticleTimelineComponent,
    FacebookTimelineComponent,
    TwitterTimelineComponent,
    YoutubeTimelineComponent,
    ArticlesComponent,
    ArticleCardComponent,
    ArticleDetailCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ArticleTimelineComponent,
    FacebookTimelineComponent,
    TwitterTimelineComponent,
    YoutubeTimelineComponent,
    ArticlesComponent,
    ArticleCardComponent,
    ArticleDetailCardComponent
  ]
})
export class ComponentsModule { }
