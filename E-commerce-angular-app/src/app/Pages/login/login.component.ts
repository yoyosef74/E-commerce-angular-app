import { Component } from '@angular/core';
import { FormBuilder ,Validators, ReactiveFormsModule,FormControl, FormGroup, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../Core/service/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ILogin } from '../../Core/interfaces/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    NgxSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router
  )
  {
    this.loginForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      }
    );
  }

  submit(){
    if(this.loginForm.valid){
      this.signIn(this.loginForm.value);
    }
    else{
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).
      forEach((control)=>this.loginForm.controls[control].markAsDirty())
    }
  }

  signIn(data : ILogin) : void {
    this._ngxSpinnerService.show();
    this._authService.login(data).subscribe({
      next: (response) => {
        if(response._id){
          console.log(response);
          this.show('success' , 'Success' , 'Success Login');
          this._ngxSpinnerService.hide();
          this._router.navigate(['user']);
        }
      },
      error: (err) => {
        console.log(err);
          this.show('error', 'Error' , err.error.error);
          this._ngxSpinnerService.hide();
      }
    });
  }

  show(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
