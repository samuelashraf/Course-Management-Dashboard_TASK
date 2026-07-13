import { Routes } from '@angular/router';
import { pendingChangesGuard } from '../../core/guards/pending-changes-guard';

export const COURSE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/course-list/course-list')
        .then(c => c.CourseList)
  },

  {
    path: 'create',
    loadComponent: () =>
      import('./pages/create-course/create-course')
        .then(c => c.CreateCourse),
         canDeactivate: [pendingChangesGuard]
        
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/edit-course/edit-course')
        .then(c => c.EditCourse),
         canDeactivate: [pendingChangesGuard]
       
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details')
        .then(c => c.CourseDetails)
  }
];