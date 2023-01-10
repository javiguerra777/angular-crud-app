import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chats } from '../chats';
import { User } from '../store/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = new User();
  messages = chats;
  showOptions = false;
  constructor(private router: Router) { }

  ngOnInit(): void {}
  filter() {
    console.log('filter messages')
  }
  toggleOptions() {
    this.showOptions = !this.showOptions;
  }
  newMessage() {
    console.log('new message')
  }
  getLocalStorage() {
    return localStorage.getItem('name')
  }
  otherUser(users: string[]) {
    let arr: string[] = []
    users.forEach((user)=> user !== this.user.getToken() ? arr.push(user) : '')
    return arr[0];
  }
  logout() {
    this.user.logOut()
    this.router.navigateByUrl('/')
  }
}
