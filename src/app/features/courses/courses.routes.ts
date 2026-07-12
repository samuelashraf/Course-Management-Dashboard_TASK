import { Routes } from '@angular/router';

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
        .then(c => c.CreateCourse)
        
  },

  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/edit-course/edit-course')
        .then(c => c.EditCourse)
       
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./pages/course-details/course-details')
        .then(c => c.CourseDetails)
  }
];