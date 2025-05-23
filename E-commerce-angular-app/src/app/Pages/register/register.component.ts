import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder ,Validators,FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../Core/service/auth.service';
import { IRegister } from '../../Core/interfaces/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared.module';
import { UserDataService } from '../../Core/service/user-data.service';
import { NotificationsService } from '../../Core/service/notifications.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  encapsulation: ViewEncapsulation.None

})
export class RegisterComponent {
  registrationForm: FormGroup;
  isRegistered: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _notificationsService: NotificationsService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router,
    private _userDataService: UserDataService
  )
  {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        rePassword: ['', [Validators.required]]
      },
      {
        validators: [this.passwordMatch()]
      }
    );
  }

  //Custom Validator
  passwordMatch(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const password = formGroup.get('password')?.value;
      const rePassword = formGroup.get('rePassword')?.value;
      const rePasswordControl = formGroup.get('rePassword') as FormControl;
      if (password !== rePassword || rePassword === '') {
        rePasswordControl.setErrors({ passNotMatch: true });
        return { passNotMatch: true };
      }
      return null;
    };
  }

  submit(){
    if(this.registrationForm.valid){
      this.signUp(this.registrationForm.value);
      this.isRegistered = true;
    }
    else{
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).
      forEach((control)=>this.registrationForm.controls[control].markAsDirty())
    }
  }

  signUp(data : IRegister) : void {
    this._ngxSpinnerService.show();
    this._authService.register(data).subscribe({
      next: (response) => {
        if(response._id){
          this._notificationsService.showSuccess('Success' , 'User registered successfully');
          const {email , password} = data
          this._authService.login({email , password}).subscribe({
            next: () => {
              localStorage.setItem('token' , response._id)
              this._router.navigate(['home']);
              this._userDataService.userName.next(response.name);
              localStorage.setItem('username' , response.name);
            }
          })
        }
        this._ngxSpinnerService.hide();
      },
      error: (err) => {
          this._notificationsService.showError('Error' , err.error.error);
          this._ngxSpinnerService.hide();
      }
    });
  }


  get name() {
    return this.registrationForm.get('name');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get rePassword() {
    return this.registrationForm.get('rePassword');
  }

}
