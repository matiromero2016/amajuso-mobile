import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { MenuController, LoadingController, NavController } from '@ionic/angular';
import { Observable, fromEvent, merge } from 'rxjs';
import { FormControlName, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidationMessages, DisplayMessage, GenericValidator } from 'src/app/models/generic-form-validation';
import { CustomValidators } from 'ng2-validation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouterModule, Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {}; 
  userForm: FormGroup;
  constructor(private menuCtrl : MenuController,
              private loadingCtrl: LoadingController,
              private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private facebook: Facebook) {
                this.validationMessages = {
                  email: {
                    required: 'Informe un e-mail',
                    email: 'Email inválido'
                  },
                  password: {
                    required: 'Informe una contraseña',
                    minLength: 'La contraseña debe contener entre 6 y 15 caracteres',
                    maxLength: 'La contraseña debe contener entre 6 y 15 caracteres'
                  },
               }
               this.genericValidator = new GenericValidator(this.validationMessages);
              }

  ngOnInit() {
  
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });
  }

  ionViewWillEnter() {
    // console.log("ionViewWillEnter ready");
    this.menuCtrl.enable(false, "mainMenu");
    let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'focusout'));
    
        merge(...controlBlurs).subscribe(() => {
          this.displayMessage = this.genericValidator.processarMensagens(this.userForm);
          console.log("ready login");
        });
  }
  
  async login() {
    if (this.userForm.invalid)
      return;

      let loading = await this.presentLoading();
      let request = this.authService.login(this.userForm.value.email, this.userForm.value.password);
      request.subscribe(data=> {
        this.authService.afterLogin(data['accessToken'], data['refreshToken'], data['expiresIn']);
        if (data['accessToken'] && data['refreshToken']) {
          this.router.navigate(['/home'], {replaceUrl: true});
          loading.dismiss();
					// this.handleLoginSucess();
				} else {
          loading.dismiss();
					// this.handleLoginError(null);
				}
      }, error => loading.dismiss());  
  }

  loginFacebook() {
    this.facebook.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
    .catch(e => console.log('Error logging into Facebook', e));
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      // cssClass: 'my-custom-class',
      spinner:'circles',
      message: 'Espere por favor..',
      backdropDismiss: false
    });

    await loading.present();
    return loading;
    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

  presentLoadingWithOptions(request: Observable<any>) {
		this.loadingCtrl.create({
			spinner: 'bubbles',
			message: 'Por favor, aguarde...',
			translucent: true,
			cssClass: ''
		}).then(loading => {
			loading.present();

			request.subscribe(() => {
				loading.dismiss();
			}, () => {
				loading.dismiss();
			});

			setTimeout(() => {
				this.loadingCtrl.getTop().then(v => v ? this.loadingCtrl.dismiss() : null);
			}, 15000);
		});
	}
}
