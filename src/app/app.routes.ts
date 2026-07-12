import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.routes')
        .then(r => r.COURSE_ROUTES)
  },
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  }
];
