import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder ,Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../../Core/service/auth.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ILogin } from '../../Core/interfaces/http';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserDataService } from '../../Core/service/user-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router,
    private _userDataService: UserDataService

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
          this.show('success' , 'Success' , 'Success Login');
          localStorage.setItem('token' , response._id);
          this._userDataService.userName.next(response.name);
          localStorage.setItem('username' , response.name);
        }
        this._ngxSpinnerService.hide();
        this._router.navigate(['home']);
      },
      error: (err) => {
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
