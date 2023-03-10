import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../store/user';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: User = new User();
  signUpForm = this.formBuilder.group({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ])
  })
  error = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private register: RegistrationService) { }

  ngOnInit(): void {
    if (this.user.getToken()) {
      this.router.navigateByUrl('/home')
    }
  }
  
  submit () {
    this.signUpForm.disable();
    this.register.signUp({
      username: this.username?.value.trim(),
      password: this.password?.value.trim()
    })
      .subscribe({
        next: data => {
          this.user.setToken(data.token)
          this.router.navigateByUrl('/home')
        },
        error: error => {
          this.error = error.message;
          this.signUpForm.enable();
        }
      })
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }
}
