import { Component, OnInit } from '@angular/core';
import { User } from '../store/user';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = new User()

  constructor(
    private postsService: PostsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

}
