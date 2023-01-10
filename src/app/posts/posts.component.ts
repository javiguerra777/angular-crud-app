import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { UserService } from '../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { Post } from '../module/post';
import { User } from '../store/user';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  user = new User();
  destroy$: Subject<boolean> = new Subject<boolean>();
  posts!: Post[];
  createOpen = false;
  createPostOpen = false;
  searchOpen = false;
  updatePostOpen = false;
  activePostId = 2;
  userImage!: string;


  constructor(
    private postsService: PostsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.postsService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
        console.log(resp)
        this.posts = resp;
      })
    this.userService.getProfileImage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
        console.log(resp)
        this.userImage = resp.image
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  deletePost(id: number): boolean | void {
    this.postsService.deletePost(id)
      .subscribe(resp => {
        this.posts = this.posts.filter((post) => post.id !== resp.id)
    })
  }

  isUsersPost(userId: number): boolean {
    return userId === this.user.getId()
  }

  toggleCreateOpen() {
    this.createOpen = !this.createOpen;
    this.searchOpen = false;
  }

  openPostCreate() {
    this.createPostOpen = true;
    console.log('time to create post')
  }

  openPostCloseTab() {
    this.createOpen = false;
    this.openPostCreate();
  }

  closeForm(option: boolean) {
    this.createPostOpen = option;
  }
  openSearch() {
    this.searchOpen = !this.searchOpen;
    this.createOpen = false;
  }
  closeSearch(option: boolean) {
    this.searchOpen = option;
  }

  openUpdate(id: number) {
    this.updatePostOpen = true;
    this.activePostId = id;
  }
  
  closeUpdate(option: boolean) {
    this.updatePostOpen = false;
  }
  newActiveId(id: number) {
    this.activePostId = id;
  }
  updatePost(resp: Post) {
    let foundIndex = this.posts.findIndex((post: Post) => post.id === resp.id)
    this.posts[foundIndex] = resp
  }
}
