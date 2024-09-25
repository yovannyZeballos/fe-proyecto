import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbRestoreScrollTopHelper } from '@nebular/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbEvaIconsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [NbRestoreScrollTopHelper]
})
export class AppComponent {
  title = 'fe-proyecto';

}
