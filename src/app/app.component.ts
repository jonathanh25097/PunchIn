import { Component } from '@angular/core';
import { PunchingProxyService } from './_services/punchin.proxy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [PunchingProxyService],
})
export class AppComponent {
  title = 'punchin-app';
}
