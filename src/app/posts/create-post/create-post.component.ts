import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Input() open!: boolean;
  @Input() posts!: any[];
  @Output() closeForm = new EventEmitter<boolean>();
  addMedia = false;
  media: any[] = [];
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
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader();
      reader.onload = () => {
        this.media.push(reader.result as string)
      }
      reader.readAsDataURL(file);
      console.log(this.media)
    }
  }

  close() {
    this.open = false;
    this.closeForm.emit(false);
  }

  submit() {
    this.postsService.createPost({
      title: this.title?.value,
      body: this.body?.value
    })
      .subscribe({
        next: data => {
          console.log(data)
          this.posts.push(data)
          this.open = false;
          this.closeForm.emit(false);
        },
        error: err => {
          console.log(err.message)
        }
    })
  }

  openMedia() {
    this.addMedia = true;
  }
  closeMedia() {
    this.addMedia = false;
    this.media = [];
  }

  get title() {
    return this.postForm.get('title')
  }
  get body() {
    return this.postForm.get('body')
  }
}
