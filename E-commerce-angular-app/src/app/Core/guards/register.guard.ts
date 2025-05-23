import { CanDeactivateFn } from '@angular/router';
import { RegisterComponent } from '../../Pages/register/register.component';

export const registerGuard: CanDeactivateFn<RegisterComponent> = (component, currentRoute, currentState, nextState) => {

  if(!component.isRegistered && component.registrationForm.valid)
  {
    const alert = window.confirm('Your data will be lost!')
    return alert
  }
  return true;
};
