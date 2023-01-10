import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.css']
})
export class PostFooterComponent implements OnInit {
  @Input() postId!: number;
  liked = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleLike() {
    this.liked = !this.liked;
  }
}
