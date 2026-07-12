import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseStatus } from '../../models/course';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-filters.html',
  styleUrl: './course-filters.scss',
})
export class CourseFilters {
@Input() searchTerm: string = '';

@Input() selectedStatus: CourseStatus | '' = '';

@Input() selectedSort = '';

@Output() searchChange = new EventEmitter<string>();

@Output() statusChange = new EventEmitter<CourseStatus | ''>();

@Output() sortChange = new EventEmitter<string>();

statuses = Object.values(CourseStatus);
}
