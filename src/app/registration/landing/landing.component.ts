import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../store/user';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user: User = new User();
  form = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
  })
  error = '';
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registration: RegistrationService,
  ) { }

  ngOnInit(): void {
    if (this.user.getToken()) {
      this.router.navigateByUrl('/home')
    }
  }

  onSubmit(): void | boolean {
    this.form.disable()
    this.registration.login({
      username: this.name?.value,
      password: this.password?.value
    })
      .subscribe({
        next: data => {
          this.user.setToken(data.token)
          this.router.navigateByUrl('/home')
        },
        error: err => {
          this.error = err.message;
          this.form.patchValue({
            password: '',
          })
          this.form.enable()
        }
    })
  }

  get name() {
    return this.form.get('name');
  }

  get password() {
    return this.form.get('password');
  }
}
