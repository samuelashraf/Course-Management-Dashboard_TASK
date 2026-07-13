import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
isMenuOpen = false;
constructor(private router: Router) {}
goHome() {
  this.isMenuOpen = false;
  this.router.navigate(['/courses']);
  } 

}
