import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { chats } from '../chats';
import { User } from '../store/user';

interface Message {
  id: number,
  from: string | number,
  message: string,
  image?: any[],
}

interface Chat {
  id: number,
  message: Message[]
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat!: Chat;
  cameraOpen = false;
  user: User = new User();
  images: any[] = [];
  openImg = false;
  messageForm = this.formBuilder.group({
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    const chatIdFromRoute = Number(routeParams.get('id'))
    const found = chats.find(chat => chat.id === chatIdFromRoute)
    if (found) {
      this.chat = found;
      console.log(this.chat)
    }
  }

  get message() {
    return this.messageForm.get('message')
  }
  sendMessage() {
    const date = Date.now()
    const randNum = Math.floor(Math.random() * 100000)
    const uniqueId = date + randNum;
    this.chat.message.push({
      id: uniqueId,
      from: this.user.getId() || '',
      message: this.message?.value,
      image: this.images
    });
    console.log(this.images)
    this.messageForm.setValue({
      message: '',
    })
    this.images = [];
    this.openImg = false;
  }

  removeMessage(id: number): boolean | void {
    this.chat.message = this.chat.message.filter((message) => message.id !== id)
    console.log(id)
  }

  call() {
    console.log('calling other user')
  }

  openCamera() {
    this.cameraOpen = true;
  }

  closeCamera(option: boolean) {
    this.cameraOpen = option;
  }
  onFileChange(file: any) {
    console.log('file to push:', file);
    const date = Date.now();
    const randNum = Math.floor(Math.random() * 10000);
    const id = date + randNum;
    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.images.push({url: reader.result as string, id})
      }
  }

  addImage(e: any) {
    if(e.target.files[0]){
      const date = Date.now();
      const randNum = Math.floor(Math.random() * 10000);
      const id = date + randNum;
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        this.images.push({url: reader.result as string, id})
      }
      e.target.value = '';
    }
  }
  handleImage(image: any) {
    const date = Date.now();
    const randNum = Math.floor(Math.random() * 10000);
    const id = date + randNum;
    this.images.push({...image, id});
  }

  removeImage(image: any) {
    this.images = this.images.filter((img) => img.id != image.id)
  }
  
  toggleImg() {
    this.openImg = !this.openImg;
  }

}
