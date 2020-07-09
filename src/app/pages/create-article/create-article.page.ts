import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController, LoadingController } from '@ionic/angular';
import { ArticleService } from 'src/app/services/article/article.service';
import { ICategory } from 'src/app/interfaces/category.interface';
import { IArticle } from 'src/app/interfaces/article.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.page.html',
  styleUrls: ['./create-article.page.scss'],
})
export class CreateArticlePage implements OnInit {

  blured = false;
  focused = false;
  editorForm: FormGroup;
  content:string;
  editorModules;
  categories : ICategory[];
  customActionSheetOptions: any = {
    header: 'Seleccione una categoría'
  };
  article : any; 

  constructor(
      private alertCtrl : AlertController,
      private toastCtrl: ToastController,
      private navCtrl : NavController,
      private router: Router,
      private loadingCtrl: LoadingController,
      private articleService: ArticleService,
      private fb: FormBuilder) { 
        this.editorModules = {
          'toolbar': [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            // ['clean'],                                         // remove formatting button    
            ['link', 'image', 'video'],                         // link and image, video

          ]
        }
      }
    

  ngOnInit() {
    this.editorForm = this.fb.group({
      editor: ['', [Validators.required, Validators.minLength(1)]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(70)]],
      category: ['', [Validators.required]]
    });
    this.getCategories();
  }  
    // created(event) {
    //   // tslint:disable-next-line:no-console
    //   console.log('editor-created', event)
    // }
  
    changedEditor(event: EditorChangeContent | EditorChangeSelection) {
      // tslint:disable-next-line:no-console
      this.content = this.editorForm.get('editor').value;
    }

    async getCategories() {
      this.articleService.getAllCategories()
        .subscribe((data) => {
          this.categories = data.items; 
           console.log(this.categories)},
                   err => console.log("error al recuperar las categorías de noticias..", err)
                  );
    }

   async onSubmit() {
     if (this.editorForm.invalid) 
     {
       console.log('data form', this.editorForm.value);
      this.showMessage("La publicación no puede estar vacía");
      return;
     }
     this.article = {Title: this.editorForm.get('title').value,
                     Content: this.editorForm.get('editor').value, 
                     CategoryId:this.editorForm.get('category').value
                     };
    const alert = await this.alertCtrl.create({
      header: 'Confirmar publicación?',
      message: 'Desea confirmar esta publicación?',
      buttons: [
        {
          text: 'Confirmar',
          handler: () => {
            this.saveArticle(this.article);
            this.editorForm.reset();
            // this.presentLoading()
            //     .then(r=> this.close());
            
          }
        }, {
          text: 'Cancelar',
          // handler: () => {
          //   // this.close();
          // }
        }
      ]
    });
    await alert.present();
    }

    async saveArticle(article: any) {
      this.articleService.addArticle(article).subscribe(
        data => this.router.navigate(['/news'], {replaceUrl: true}),
        error => {
          console.log('Error:', error);
          this.showMessage('Ocurrió un error al grabar noticia');
        }
      )
    }

    async presentLoading() {
      const loading = await this.loadingCtrl.create({
        // cssClass: 'my-custom-class',
        message: 'Espere por favor',
        duration: 3000,
        backdropDismiss: false
      });

      await loading.present();

      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }

    async showMessage(message: string) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 3000
      });
      toast.present();
    }
    
    close() {
      this.navCtrl.navigateRoot('home');
    }
  
    // focus($event) {
    //   // tslint:disable-next-line:no-console
    //   console.log('focus', $event)
    //   this.focused = true
    //   this.blured = false
    // }
  
    // blur($event) {
    //   // tslint:disable-next-line:no-console
    //   console.log('blur', $event)
    //   this.focused = false
    //   this.blured = true
    // }

}
