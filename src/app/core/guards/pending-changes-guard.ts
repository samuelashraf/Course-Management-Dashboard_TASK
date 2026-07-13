import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../models/can-component-deactivate';

export const pendingChangesGuard:CanDeactivateFn<CanComponentDeactivate> =
(component) => {
 console.log('GUARD FIRED');
  return component.canDeactivate();

};