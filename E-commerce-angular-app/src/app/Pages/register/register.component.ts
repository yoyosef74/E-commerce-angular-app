import { Component } from '@angular/core';
import { FormBuilder ,Validators, ReactiveFormsModule,FormControl, FormGroup, FormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      if (password !== rePassword) {
        rePasswordControl.setErrors({ passNotMatch: true });
        return { passNotMatch: true };
      }
      return null;
    };
  }

  submit(){
    console.log(this.registrationForm)
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

  // name!: FormControl
  // email!: FormControl
  // password!: FormControl
  // rePassword!: FormControl
  // registrationForm!: FormGroup

  // constructor(){
  //   this.initFormControls()
  //   this.initFormGroup()
  // }

  // initFormControls():void {
  //   this.name = new FormControl();
  //   this.email = new FormControl();
  //   this.password = new FormControl();
  //   this.rePassword = new FormControl();
  // }

  // initFormGroup():void {
  //   this.registrationForm = new FormGroup(({
  //     name: this.name,
  //     email: this.email,
  //     password: this.password,
  //     rePassword: this.rePassword,
  //   }))
  // }
}
