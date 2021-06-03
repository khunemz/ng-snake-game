import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserGame } from '../models/user-game';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<User[]> {
    return of(users);
  }
}

const users  = [
  { 
    userId: 1,
    username: 'khunemz', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Khunemz Roobklom' ,
  }, 
  { 
    userId: 2,
    username: 'TonyWoodsome', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Thaksin Sinawatra' ,
  }, 
  { 
    userId: 3,
    username: 'pooyingluck', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Yingluck Sinawatra' ,
  }, 
  { 
    userId: 4, 
    username: 'JD',
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'John Doe' ,
  }, 
];