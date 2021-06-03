import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameStats } from 'src/app/models/game-stats';
import { Player } from 'src/app/models/player';
import { PlayerGame } from 'src/app/models/player-game';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  players: Player[] = [];
  game!: Game;
  gameStats: GameStats[] = [];
  isStart = false;
  isFinish = false;
  diceScore: number = 1;
  playerIndex = 0;
  currentPlayer: Player = {} as Player;
  playerGame: PlayerGame[] = [];
  turnNumber = 1;
  metricSize: number = 0;

  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    // todo get routing params for room id
    this.metricSize = 25;

    // init game
    this.gameService.initGame(25).subscribe(game => {
      this.game = game;
    });
    // get players
    this.gameService.getAllPlayers().subscribe(users => this.players = users);

    // init game stat
    this.players.forEach((player, index) => {
      const stats: GameStats = {
        id: index,
        roomId: 1,
        gameId: this.game.gameId,
        playerId: player.playerId,
        turnNumber: 0,
        pointPerTurn: 0,
        accumScore: 0,
        currentMetricIndex: 0,
        metaDescription: `${player.playerName} : 0 point | เริ่มเกม`,
        timestamp: (new Date()).toString(),
      };
      this.gameStats.push(stats);

      // init player-game
      const playerGame: PlayerGame = {
        playerId: player.playerId,
        gameId: this.game.gameId,
        turnCount: 1,
        currentMetricIndex: index,
      };
      this.playerGame.push(playerGame);
    });

    // initCurrentPlayer
    this.currentPlayer = this.players[this.playerIndex];


  }

  doYourTurn(): void {
    const player = this.players[this.playerIndex];
    this.currentPlayer = player;
    const previousStatsArr = this.gameStats.filter(x => x.playerId == player.playerId);
    const prevStat = previousStatsArr.pop();
    const diceScore = this.randDice(6, 1);
    const playerGame = this.playerGame.find(x => x.playerId == player.playerId);
    const nextIndex = playerGame!.currentMetricIndex + diceScore;

    if (nextIndex >= this.metricSize) {
      this.isFinish = true;
      return;
    }
    const nextMetric = this.game.matrics.find(x => x.index === nextIndex);

    let stats: GameStats;
    let nextMetricIndex;
    let score = 0;
    if (nextMetric?.isHasObstruct) {
      if (nextMetric.bonus > 0) {
        score = diceScore + nextMetric.bonus;
      } else {
        score = nextMetric.bonus;
      }
    }

    if (prevStat) {
      stats = {
        id: prevStat.id++,
        roomId: 1,
        gameId: this.game.gameId,
        playerId: player.playerId,
        turnNumber: this.turnNumber,
        pointPerTurn: diceScore,
        accumScore: prevStat.accumScore += score,
        currentMetricIndex: prevStat.currentMetricIndex += score,
        metaDescription: `${player.playerName} : ${diceScore} point | ${nextMetric?.description}`,
        timestamp: (new Date()).toString(),
      };

    } else {
      stats = {
        id: this.playerIndex,
        roomId: 1,
        gameId: this.game.gameId,
        playerId: player.playerId,
        turnNumber: this.turnNumber,
        pointPerTurn: score,
        accumScore: score,
        currentMetricIndex: score,
        metaDescription: `${player.playerName} : ${score} point | ${nextMetric?.description}`,
        timestamp: (new Date()).toString(),
      };
    }
    this.gameStats.push(stats)
    if (this.playerIndex < this.players.length) {
      this.playerIndex++;
    } else {
      this.playerIndex = 0;
    }

    this.turnNumber++;
  }

  randDice(max: number, min: number): number {
    const diceScore = Math.floor(Math.random() * (max - min + 1) + min);
    this.diceScore = diceScore;
    return diceScore;
  }

}
