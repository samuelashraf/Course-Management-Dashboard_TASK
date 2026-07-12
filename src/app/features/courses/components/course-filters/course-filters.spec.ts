import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilters } from './course-filters';

describe('CourseFilters', () => {
  let component: CourseFilters;
  let fixture: ComponentFixture<CourseFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
