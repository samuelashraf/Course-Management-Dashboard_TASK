import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Courseservice } from '../../services/courseservice';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm  implements OnInit{

  @Input() isEditMode = false;
  @Input() courseId!: number;
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private courseService: Courseservice,
  private toastr: ToastrService,
   private router: Router
  ) {

    this.courseForm = this.fb.group({

      courseName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      instructorName: [
        '',
        Validators.required
      ],

      category: [
        '',
        Validators.required
      ],

      duration: [
        null,
        [ Validators.min(1),
          Validators.required,
          Validators.pattern('^[0-9]+$'),
         
        ]
      ],

      price: [
        null,
        [
          Validators.min(0),
          Validators.required,
          Validators.pattern('^[0-9]+(\\.[0-9]+)?$'),
          
        ]
      ],

      status: [
        '',
        Validators.required
      ],

      description: [
        '',
        Validators.maxLength(500)
      ]

    });

  }

   ngOnInit(): void {

    if (this.isEditMode && this.courseId) {

      this.courseService
        .getCoursesById(this.courseId)
        .subscribe(course => {

          this.courseForm.patchValue({

            courseName: course.courseName,
            instructorName: course.instructorName,
            category: course.category,
            duration: course.duration,
            price: course.price,
            status: course.status,
            description: course.description

          });
          this.courseForm.markAsPristine();

        });

    }

  }

  submit() {

    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    if (this.isEditMode) {

      this.updateCourse();

    } else {

      this.addCourse();

    }

  }
addCourse() {
  this.courseService.getCourses().subscribe({
    next: (courses) => {
      const lastId = courses.length > 0
        ? Math.max(...courses.map(c => Number(c.id)))
        : 0;

      const course = {
        ...this.courseForm.value,
        id: lastId + 1,
        createdDate: new Date().toISOString().split('T')[0]
      };

      this.courseService.addCourse(course).subscribe({
        next: () => {
          this.courseForm.markAsPristine();
          this.toastr.success('Course created successfully', 'Success');
          this.router.navigate(['/courses']);
        },
        error: () => {
          this.toastr.error('Failed to create course', 'Error');
        }
      });
    },
    error: () => {
      this.toastr.error('Failed to generate ID', 'Error');
    }
  });
}

updateCourse() {

  const course = {

    id: this.courseId,

    ...this.courseForm.value,

    createdDate: new Date().toISOString()

  };

  this.courseService.updateCourse(
    course
  ).subscribe({

    next: () => {
        this.courseForm.markAsPristine();
      this.toastr.success(
        'Course updated successfully',
        'Success'
      );

      this.router.navigate(['/courses']);

    },

    error: () => {

      this.toastr.error(
        'Failed to update course',
        'Error'
      );

    }

  });

}

  get f() {
    return this.courseForm.controls;
  }

canDeactivate(): Promise<boolean> {

  console.log('DIRTY = ', this.courseForm.dirty);

  if (!this.courseForm.dirty) {
    return Promise.resolve(true);
  }

  return Swal.fire({
    title: 'Unsaved Changes',
    text: 'You have unsaved changes. Do you really want to leave?',
    icon: 'warning',
    showCancelButton: true
  }).then(r => r.isConfirmed);

}

goBack() {
  this.router.navigate(['/courses']);
}
}
