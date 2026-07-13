import { Component, ViewChild,OnInit } from '@angular/core';
import { CourseForm } from '../../components/course-form/course-form';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-course',
  imports: [CourseForm],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.scss',
})
export class EditCourse implements OnInit  {

courseId!: number;
@ViewChild(CourseForm)
  courseFormComponent!: CourseForm;

  canDeactivate() {
    return this.courseFormComponent?.canDeactivate() ?? true;
  }

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.courseId = Number(
      this.route.snapshot.paramMap.get('id')
    );
  }
}

