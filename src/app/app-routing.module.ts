import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalStorageGuard, Permissions } from './auth/localstorage.guard';
import { LandingComponent } from './registration/landing/landing.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './registration/signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: HomeComponent, canActivate: [LocalStorageGuard] },
  { path: 'chat/:id', component: ChatComponent, canActivate: [LocalStorageGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LocalStorageGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [LocalStorageGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [LocalStorageGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [LocalStorageGuard]}
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  providers: [LocalStorageGuard, Permissions],
  exports: [RouterModule]
})
export class AppRoutingModule { }