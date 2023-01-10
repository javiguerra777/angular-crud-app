import { Component, OnInit } from '@angular/core';
import { User } from './store/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  user = new User()

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    if (this.user.getToken()) {
      this.userService.getId()
        .subscribe(resp => {
          this.user.setId(resp.id)
          this.user.setUsername(resp.username)
      })
    }
  }
}
