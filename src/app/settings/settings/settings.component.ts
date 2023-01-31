import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../store/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  fallBackImg = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  profilePicture!: string;
  imageUrl!: string;
  user: User = new User();
  nameForm = this.formBuilder.group({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ])
  })
  passwordForm = this.formBuilder.group({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  })
  fileForm = this.formBuilder.group({
    image: new FormControl('', [
      Validators.required,
    ]),
    fileSource: new FormControl('', [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getProfileImage()
      .pipe(takeUntil(this.destroy$))
      .subscribe(resp => {
      this.profilePicture = resp.image
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileForm.patchValue({
        fileSource: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      }
      reader.readAsDataURL(file)
    } else {
      this.imageUrl = ''
    }
  }

  changeProfile(option: string) {
    switch (option) {
      case 'NAME':
        this.user.setToken(this.nameForm.value.name);
        this.nameForm.setValue({
          name: '',
        })
        break;
      case 'PASSWORD':
        this.passwordForm.setValue({
          password: ''
        })
        break;
      case 'FILE':
        const data: any = new FormData()
        data.file = this.fileForm.get('fileSource')?.value
        console.log(data)
        this.fileForm.setValue({
          image: null,
          fileSource: null,
        })
        this.imageUrl = '';
        break;
      default:
        break;
    }
  }
}
