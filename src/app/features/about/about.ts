import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  router = inject(Router);
  
  goToMenu() {
    this.router.navigate(['/menu']);
  }

}
