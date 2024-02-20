import { Component } from '@angular/core';
import { SharedModule } from '../../../common/shared/shared.module';
import { NgForm } from '@angular/forms';
import { RegisterModel } from '../models/register.model';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  register(form: NgForm) {
    if (form.valid) {
      let model: RegisterModel = new RegisterModel();

      model.name = form.controls['name'].value;
      model.email = form.controls['email'].value;
      model.password = form.controls['password'].value;
      this._auth.register(model, (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._toastr.success("Kullanıcı kaydı başarıyla tamamlandı!")
        this._router.navigateByUrl("/")
      });
    }
  }
}
