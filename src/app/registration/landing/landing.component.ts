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
    console.log('form value', this.form.value)
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
          console.log(err.message)
          this.form.setValue({
            name: '',
            password: '',
          })
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
