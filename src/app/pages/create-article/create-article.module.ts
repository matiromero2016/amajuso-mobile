import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateArticlePageRoutingModule } from './create-article-routing.module';

import { CreateArticlePage } from './create-article.page';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateArticlePageRoutingModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: true
      }
    })
  ],
  declarations: [CreateArticlePage]
})
export class CreateArticlePageModule {}
