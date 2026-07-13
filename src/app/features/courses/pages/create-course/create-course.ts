import { Component, ViewChild } from '@angular/core';
import { CourseForm } from '../../components/course-form/course-form';

@Component({
  selector: 'app-create-course',
imports: [CourseForm],
  templateUrl: './create-course.html',
  styleUrl: './create-course.scss',
})
export class CreateCourse {
@ViewChild(CourseForm)
  courseFormComponent!: CourseForm;

  // canDeactivate() {
    
  //   return this.courseFormComponent?.canDeactivate() ?? true;
  // }
}
