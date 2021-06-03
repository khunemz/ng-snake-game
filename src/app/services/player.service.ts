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
  
  getAllPlayers(): Observable<Player[]> {
    return of(users);
  }
}

const users  = [
  { 
    playerId: 1,
    playerName: 'khunemz', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Khunemz Roobklom' ,
    currentIndex: 0,
  }, 
  { 
    playerId: 2,
    playerName: 'TonyWoodsome', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Thaksin Sinawatra' ,
    currentIndex: 0,

  }, 
  { 
    playerId: 3,
    playerName: 'Pooyingluck', 
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Yingluck Sinawatra' ,
    currentIndex: 0,

  }, 
  { 
    playerId: 4, 
    playerName: 'TheRealDonaldTrump',
    avatarImgUrl: 'http://www.gravatar.com/avatar.php?gravatar_id=df3d4780faaf2446a65ce39eafdfe1c0' ,
    avatarName: 'Donald Trump' ,
    currentIndex: 0,

  }, 
];