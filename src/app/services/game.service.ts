import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game';
import { GameStats } from '../models/game-stats';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<User[]> {
    return of(players);
  }  
  
  initGame(): Observable<Game> {
    return of(game);
  }

  saveGameStats(stats: GameStats): Observable<GameStats[]> {
    return of([...gameStats, stats]);
  }
  
}

const players  = [
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

const game : Game  = {
  gameId: 1,
  gameCode: 'G01',
  gameName: 'Snake Game',
  maxScore: Number.MAX_SAFE_INTEGER,
  minScore: 0,
  maxTime: 3600, // in second
  maxTurnCount: Number.MAX_SAFE_INTEGER,
  matricX: 5,
  matricY: 5,
  maxObstruct: 10,
}

const gameStats: GameStats[] = [];