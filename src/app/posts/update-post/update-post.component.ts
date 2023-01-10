import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
import { PostsService } from '../../services/posts.service'
import { Post } from '../../module/post';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {
  @Input() id!: number;
  @Input() open!: boolean;
  @Output() close = new EventEmitter<boolean>();
  @Output() newId = new EventEmitter<number>();
  @Output() post  = new EventEmitter<Post>(); 
  destroy$: Subject<boolean> = new Subject<boolean>();
  postForm = this.formBuilder.group({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(15)
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)
    ])
  })
  constructor(
    private formBuilder: FormBuilder,
    private postsService: PostsService,
  ) { }

  ngOnInit(): void {
    this.postsService.getPost(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
        this.postForm.setValue({
          title: resp.title,
          body: resp.body,
        })
    })
  }
  ngOnDestroy(): void {
    this.newId.emit(0);
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  closeForm() {
    this.open = false;
    this.close.emit(false);
  }
  submit() {
    console.log('submitting form')
    this.postsService.updatePost(this.id, {
      title: this.title?.value,
      body: this.body?.value,
    })
      .subscribe(resp => {
        console.log(resp)
        this.post.emit(resp)
        this.closeForm();
    })
  }

  get title() {
    return this.postForm.get('title')
  }
  get body() {
    return this.postForm.get('body')
  }
}
