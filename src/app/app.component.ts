import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-modul';
  routes: any[] = [];
  activeIndex = 0;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute) {
    this.routes = [
      { link: 'mundarija', label: 'Mundarija' },
      { link: 'video', label: 'Video' },
      { link: 'test', label: 'Test' },
      { link: 'exercises', label: 'Mashqlar' },
      { link: 'crossword', label: 'Krossvord' },
      { link: 'help', label: 'Yordam' },
    ]
  }
}
