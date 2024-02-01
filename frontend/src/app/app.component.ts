import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgxSpinnerModule],
  template: `<router-outlet></router-outlet>
    <ngx-spinner
      bdColor="rgba(0,0,0,0.8)"
      size="medium"
      color="#ffffff"
      type="triangle-skew-spin"
      [fullScreen]="true"
      ><p style="color: white">Lütfen Bekleyiniz...</p></ngx-spinner
    >`,
})
export class AppComponent {
  title = 'frontend';
}
