import { Component, OnInit } from '@angular/core';
import { filter, Subject, takeUntil, map } from 'rxjs';
import { UsersService } from '../services/users.service';
import { friends } from 'src/friends';

interface Id {
  id: number
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: any;
  searchFriends = '';
  searchUsers = '';
  showFriends = true;
  friends = friends;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getAll().pipe(
      takeUntil(this.destroy$)
    ).subscribe(resp => {
      this.users = resp;
    })
  }
  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addUser(user: any) {
    this.friends.push(user);
  }

  removeUser(id: number) {
    let index = this.friends.findIndex((friend: Id) => friend.id === id)
    this.friends.splice(index, 1)
  }

  toggleDisplay(option: boolean) {
    this.showFriends = option;
  }
  
  filterUsers(val: string) {
    this.searchUsers = val;
    if (!this.searchUsers) {
      return this.users;
    }
    return this.users.filter((user: any) => user.name.toLowerCase().includes(this.searchUsers))
  }
  filterFriends(val: string) {
    this.searchFriends = val
    if (!this.searchFriends) {
      return this.friends
    }
    return this.friends.filter((friend: any) => friend.name.toLowerCase().includes(this.searchFriends))
  }
  existingFriend(id: number) {
    return this.friends.find(friend => friend.id === id)
  }
}
