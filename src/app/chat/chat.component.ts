import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { chats } from '../chats';
import { User } from '../store/user';

interface Message {
  id: number,
  from: string | number,
  message: string,
  image?: string,
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
  selfie!: any;
  messageForm = this.formBuilder.group({
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
  })

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
      // console.log(this.chat)
    }
  }

  get message() {
    return this.messageForm.get('message')
  }
  sendMessage() {
    console.log(this.selfie)
    const date = Date.now()
    const randNum = Math.floor(Math.random() * 100000)
    const uniqueId = date + randNum;
    this.chat.message.push({
      id: uniqueId,
      from: this.user.getId() || '',
      message: this.message?.value,
      image: this.selfie?.imageAsDataUrl
    })
    this.messageForm.setValue({
      message: '',
    })
    this.selfie = null;
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

  handleImage(image: any) {
    // console.log(image);
    this.selfie = image;
  }

  removeImage() {
    this.selfie = null;
  }

}
