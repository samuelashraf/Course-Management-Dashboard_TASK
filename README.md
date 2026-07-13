# Course Management Dashboard

A full-featured Angular web application for managing educational courses — built as a technical assessment task.

---

## Short Description

Course Management Dashboard allows users to view, search, filter, add, edit, delete, and view details of courses in an educational platform. Built with Angular 21 using standalone components, signals, reactive forms, and lazy-loaded feature routes.

---

## Technologies Used

- Angular 21 (Standalone Components + Signals)
- TypeScript 5.9
- Bootstrap 5
- JSON Server (Mock API)
- ngx-toastr
- SweetAlert2

---

## Features Implemented

- View all courses in a responsive table / cards layout
- Search courses by name
- Filter courses by status
- Sort courses by name, price, duration, and created date
- Add a new course with Reactive Forms validation
- Edit an existing course
- Delete a course with confirmation modal
- View course details page
- Loading, empty, and error states

---

## Bonus Features

- Pagination
- Sorting
- Confirmation modal (SweetAlert2)
- Toast notifications (ngx-toastr)
- Lazy-loaded feature routes
- Reusable components (`CourseTable`, `CourseFilters`, `Pagination`)
- Route guard (`CanDeactivate`) on the Add/Edit form
- Loading skeleton
- Clean and scalable folder structure

---

## How to Run the Project

Install dependencies, start the mock API, then start the Angular dev server:

```bash
npm install
npm run mock-api
ng serve
```

Once both are running, open your browser at `http://localhost:4200/`.

---

## Mock API Explanation

This project uses **JSON Server** as a mock REST API.

- Data is stored in `db.json` at the root of the project.
- JSON Server runs on `http://localhost:3000`
- Angular app runs on `http://localhost:4200`

---

## Assumptions

- Course ID is auto-generated using `Math.max` of existing IDs + 1.
- `createdDate` is set automatically on creation.
- Desktop-first design, with full mobile responsiveness (table view on desktop/tablet, card view on mobile).

---

## Development Notes (Angular CLI)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

**Code scaffolding**

```bash
ng generate component component-name
```

**Build**

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

**Unit tests** (via [Vitest](https://vitest.dev/))

```bash
ng test
```

**End-to-end tests**

Angular CLI does not include an e2e framework by default; none is configured for this project.

---

For more on the Angular CLI, see the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).