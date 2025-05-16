import { Component } from '@angular/core';
import { FormBuilder ,Validators, ReactiveFormsModule,FormControl, FormGroup, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { AuthService } from '../../Core/service/auth.service';
import { IRegister } from '../../Core/interfaces/iregister';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [MessageService]
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _messageService: MessageService
  )
  {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
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
    }
    else{
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).
      forEach((control)=>this.registrationForm.controls[control].markAsDirty())
    }
  }

  signUp(data : IRegister) : void {
    this._authService.register(data).subscribe({
      next: (response) => {
        if(response._id){
          console.log(response);
          this.show('success' , 'Success' , 'User registered successfully');
        }
      },
      error: (err) => {
          this.show('error', 'Error' , err.error.error);
          console.log(err.error.error);
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
