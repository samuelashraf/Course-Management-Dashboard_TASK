import { Component, computed, OnInit, signal } from '@angular/core';
import { Course, CourseStatus } from '../../models/course';
import { Courseservice } from '../../services/courseservice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/internal/operators/filter';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseFilters } from '../../components/course-filters/course-filters';
import { CourseTable } from '../../components/course-table/course-table';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule,CourseFilters,CourseTable,FormsModule],
  templateUrl:'./course-list.html',
  styleUrl: './course-list.scss',
})
export class CourseList implements OnInit {
 courses      = signal<Course[]>([]);
  isLoading    = signal(true);
  errorMessage = signal('');
  searchTerm   = signal('');
  selectedStatus = signal<CourseStatus | ''>('');
  currentPage  = signal(1);
  sortBy = signal('');
  readonly pageSize = 2;
   constructor(
    private courseService:Courseservice,
    private router: Router,
    private toastr:ToastrService
  ){

  }
  ngOnInit(): void {
  
    this.loadCourses(); 

  }
     loadCourses() {
    this.isLoading.set(true);
    this.courseService.getCourses().subscribe({
      next: (data) => { 
        this.courses.set(data); 
     setTimeout(() => {

        this.isLoading.set(false);

      }, 1500);
      },
      error: (err) => {
            setTimeout(() => {

        this.errorMessage.set('Failed to load courses');
        this.isLoading.set(false);

      }, 1500);
      }
    });
  }

 filtered = computed(() => {

  const term = this.searchTerm().toLowerCase();
  const status = this.selectedStatus();

  const result = this.courses().filter(c =>
    c.courseName.toLowerCase().includes(term) &&
    (status ? c.status === status : true)
  );

  switch (this.sortBy()) {

    case 'name':
      result.sort((a, b) =>
        a.courseName.localeCompare(b.courseName)
      );
      break;

    case 'price':
      result.sort((a, b) =>
        a.price - b.price
      );
      break;

    case 'duration':
      result.sort((a, b) =>
        a.duration - b.duration
      );
      break;

    case 'createdDate':
      result.sort((a, b) =>
        new Date(b.createdDate).getTime() -
        new Date(a.createdDate).getTime()
      );
      break;
  }

  return result;
});

  paginated = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  goToCreat(){
    this.router.navigate(['/courses/create'])
  }

  onSearch(term: string){
     this.searchTerm.set(term);           
     this.currentPage.set(1); 
            
  }
  onStatusChange(s: CourseStatus | '') {
     this.selectedStatus.set(s);
     this.currentPage.set(1);
 }
  onPageChange(page: number){ 
    this.currentPage.set(page); 
  }

  onView(course: Course){
     this.router.navigate(['/courses', course.id]); 
  }
  onEdit(course: Course){ 
    this.router.navigate(['/courses', course.id, 'edit']); 
  }
onDelete(course: Course) {

  Swal.fire({

    title: 'Delete Course?',
    text: `Are you sure you want to delete "${course.courseName}" ?`,
    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'Yes, Delete',
    cancelButtonText: 'Cancel',

    reverseButtons: true

  }).then(result => {

    if (result.isConfirmed) {

      this.courseService.deleteCourse(course.id)
        .subscribe({

          next: () => {

            Swal.fire({
              icon: 'success',
              title: 'Deleted',
              text: 'Course deleted successfully',
              timer: 1500,
              showConfirmButton: false
            });

            this.courses.update(
              list => list.filter(c => c.id !== course.id)
            );

          },

          error: () => {

            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Failed to delete course'
            });

          }

        });

    }

  });

}

onSortChange(sort: string) {
  this.sortBy.set(sort);
  this.currentPage.set(1);
}
}
  
 