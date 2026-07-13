import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Pagination } from '../../../../shared/components/pagination/pagination';
import { Course, CourseStatus } from '../../models/course';

@Component({
  selector: 'app-course-table',
  imports: [CommonModule,Pagination],
  templateUrl: './course-table.html',
  styleUrl: './course-table.scss',
})
export class CourseTable {
 courses = input.required<Course[]>();




@Input() currentPage: number = 1;
@Input() totalItems: number = 0;
@Input() pageSize: number = 2;

@Output() pageChange = new EventEmitter<number>();

@Output() view = new EventEmitter<Course>();

@Output() edit = new EventEmitter<Course>();

@Output() delete = new EventEmitter<Course>();
  statusClass(status: CourseStatus): string {
    return {
       [CourseStatus.Active]:   'status-active',
      [CourseStatus.Draft]:    'status-draft',
      [CourseStatus.Archived]: 'status-archived'
    }[status];
  }
}
