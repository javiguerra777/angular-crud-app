import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LandingComponent } from './registration/landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component'
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { CameraComponent } from './chat/camera/camera.component';
import { WebcamModule } from 'ngx-webcam';
import { SignupComponent } from './registration/signup/signup.component';
import { FooterComponent } from './component/footer/footer.component';
import { PostsComponent } from './posts/posts.component';
import { PostFooterComponent } from './posts/post-footer/post-footer.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { UpdatePostComponent } from './posts/update-post/update-post.component';
import { SearchBarComponent } from './posts/search-bar/search-bar.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    ChatComponent,
    UsersComponent,
    SettingsComponent,
    CameraComponent,
    SignupComponent,
    FooterComponent,
    PostsComponent,
    PostFooterComponent,
    CreatePostComponent,
    UpdatePostComponent,
    SearchBarComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebcamModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
