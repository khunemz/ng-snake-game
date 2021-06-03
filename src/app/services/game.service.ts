import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game';
import { GameStats } from '../models/game-stats';
import { Metric } from '../models/metric';
import { Obstruct } from '../models/obstruct';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getAllPlayers(): Observable<Player[]> {
    return of(players);
  }  
  
  initGame(metricSize: number): Observable<Game> {
    return of(game(metricSize, 10));
  }

  saveGameStats(stats: GameStats): Observable<GameStats[]> {
    return of([...gameStats, stats]);
  }
  
}

const players  = [
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
        isHasObstruct: false,
        bonus: 0,
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
        isHasObstruct: false,
        bonus: 0,
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
        isHasObstruct: true,
        bonus: randIndex - i,
      };
      obstructCount++;
    } else {
      element = {
        index: i,
        position: (i+1),
        isStart: 0,
        isFinish: 0,
        moveToIndex: -1,
        description: "",
        iconUrl: "",
        isHasObstruct: false,
        bonus: 0 ,
      };
    }

    mets.push(element);
  }
  return mets;
};
const game  = (metricSize: number, maxObstruct: number) => (
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
    maxObstruct: maxObstruct,
    matrics: metrics(metricSize, maxObstruct)
  }
);

const gameStats: GameStats[] = [];