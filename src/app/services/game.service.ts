import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game';
import { GameStats } from '../models/game-stats';
import { Metric } from '../models/metric';
import { Obstruct } from '../models/obstruct';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<User[]> {
    return of(players);
  }  
  
  initGame(metricSize: number): Observable<Game> {
    return of(game(metricSize));
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


const rand = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const metrics = (meticsSize: number, maxObstruct: number) => {

  let mets = [] as Metric[];
  let obstructCount = 0;
  for (let i = 0; i < meticsSize; i++) {
    const isAddObstruct = rand(1,0);
    let element = {} as Metric;
    if(i === 0) {
      element = {
        index: i,
        position: (i+1),
        isStart: 1,
        isFinish: 0,
        moveToIndex: i,
        description: "START",
        iconUrl: "",
      };
    }
    else if (i === (meticsSize - 1)) {
      element = {
        index: i,
        position: (i+1),
        isStart: 0,
        isFinish: 1,
        moveToIndex: (meticsSize - 1),
        description: "FINISH",
        iconUrl: "",
      };
    }
    else if((i !== 0 ) && (i !== (meticsSize - 1)) && (obstructCount < maxObstruct) && (isAddObstruct === 1)){
      const randIndex = rand(meticsSize, 0);
      element = {
        index: i,
        position: (i+1),
        isStart: 0,
        isFinish: 0,
        moveToIndex: randIndex,
        description: `ไปยังช่องที่ ${randIndex}`,
        iconUrl: "",
      };
      obstructCount++;
    } else {
      element = {
        index: i,
        position: (i+1),
        isStart: 0,
        isFinish: 0,
        moveToIndex: undefined,
        description: "",
        iconUrl: "",
      };
    }

    mets.push(element);
  }
  return mets;
};
const game  = (metricSize: number) => (
  {
    gameId: 1,
    gameCode: 'G01',
    gameName: 'Snake Game',
    maxScore: Number.MAX_SAFE_INTEGER,
    minScore: 0,
    maxTime: 3600, // in second
    maxTurnCount: Number.MAX_SAFE_INTEGER,
    matricX: Math.sqrt(metricSize),
    matricY: Math.sqrt(metricSize),
    maxObstruct: 5,
    matrics: metrics(metricSize, Math.sqrt(metricSize))
  }
);

const gameStats: GameStats[] = [];