import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl, AbstractControl } from '@angular/forms';
import {GenericValidator, ValidationMessages, DisplayMessage} from '../../models/generic-form-validation';
import { CustomValidators } from 'ng2-validation';
import { MenuController } from '@ionic/angular';
import { Observable, fromEvent, merge } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  
  usuario: IUser;
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {}; 
  userForm: FormGroup;

  constructor(
     private fb : FormBuilder,
     private menuCtrl: MenuController,
     private authService: AuthService) {
      this.validationMessages = {
        name: {
          required: 'El nombre es requerido',
          minlength: 'El nombre debe tener como mínimo 2 caracteres',
          maxlength: 'El nombre debe tener como máximo 50 caracteres'
        },
        lastName: {
          required: 'El apellido es requerido',
          minlength: 'El apellido debe tener como mínimo 2 caracteres',
          maxlength: 'El apellido debe tener como máximo 50 caracteres'
        },
        email: {
          required: 'Informe un e-mail',
          email: 'Email inválido'
        },
        password: {
          required: 'Informe una contraseña',
          rangeLength: 'La contraseña debe contener entre 6 y 15 caracteres'
        },
        repassword: {
          required: 'Informe la contraseña nuevamente',
          rangeLength: 'La contraseña debe contener entre 6 y 15 caracteres',
          equalTo: 'Las contraseñas no son iguales'
        }
      };
      this.genericValidator = new GenericValidator(this.validationMessages);
      
  }
  ngOnInit() {
    let password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
    let repassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(password)]);
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.maxLength(12)]],
      password: password,
      repassword: repassword
    });
  }
  ionViewWillEnter() {
    // console.log("ionViewWillEnter ready");
    this.menuCtrl.enable(false);
    let controlBlurs: Observable<any>[] = this.formInputElements
        .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'focusout'));
    
        merge(...controlBlurs).subscribe(() => {
          this.displayMessage = this.genericValidator.processarMensagens(this.userForm);
          console.log("ready test");
        });
	}
  
  static matches(form: AbstractControl){
    return form.get('repassword').value == form.get('password').value ? null : {equals: true};
}

signUp() {
  if (this.userForm.dirty && this.userForm.valid) {
    this.usuario = Object.assign({}, this.usuario, this.userForm.value);

    this.authService.signUp(this.usuario).subscribe(data =>
       this.authService.login(data.email, data.password));
       //guardar token en el localStorage
       //redireccionar para el home

  }
}

      // ngAfterViewInit(): void {
      //   // let controlBlurs: Observable<any>[] = this.formInputElements
      //   // .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'focusout'));
    
      //   // merge(...controlBlurs).subscribe(() => {
      //   //   this.displayMessage = this.genericValidator.processarMensagens(this.userForm);
      //   //   console.log("ready test");
      //   // });
      // }

	// ionViewWillLeave() {
  //   this.menuCtrl.enable(true);
  //   // console.log("ionViewWillLeave ready");
	// }

 

}
