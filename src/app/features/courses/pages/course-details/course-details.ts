import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Courseservice } from '../../services/courseservice';
import { Course } from '../../models/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [CommonModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.scss',
})
export class CourseDetails {

  course?: Course;

  isLoading = true;

  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: Courseservice,
     private cdr: ChangeDetectorRef 
  ) { }

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.courseService.getCoursesById(id)
      .subscribe({

        next: (res) => {
          console.log(res);
          this.course = res;
          this.isLoading = false;
           this.cdr.detectChanges();

        },

        error: () => {

          this.errorMessage = 'Failed to load course.';
          this.isLoading = false;
           this.cdr.detectChanges();

        }

      });

  }

  goBack() {

    this.router.navigate(['/courses']);

  }
}

