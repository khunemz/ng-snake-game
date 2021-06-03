import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Player } from '../models/player';
import { PlayerGame } from '../models/player-game';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }
  
  getAllUsers(): Observable<Player[]> {
    return of(users);
  }
}

const users  = [
  { 
    playerId: 1,
    playerName: 'khunemz', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Khunemz Roobklom' ,
  }, 
  { 
    playerId: 2,
    playerName: 'TonyWoodsome', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Thaksin Sinawatra' ,
  }, 
  { 
    playerId: 3,
    playerName: 'pooyingluck', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Yingluck Sinawatra' ,
  }, 
  { 
    playerId: 4, 
    playerName: 'JD',
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'John Doe' ,
  }, 
];