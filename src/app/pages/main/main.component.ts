import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameStats } from 'src/app/models/game-stats';
import { Metric } from 'src/app/models/metric';
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
  styleBox: string = '';
  constructor(private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    // todo get routing params for room id
    this.metricSize = 36;

    this.initGame(this.metricSize);

    this.initPlayer();

    // init game stat
    this.players.forEach((player, index) => {
      this.pushStats(player, index);
      this.initPlayerGame(player, index);
    });

    // initCurrentPlayer
    this.initPlayer()
  }

  initPlayerGame(player: Player, index: number): void {
    // init player-game
    const playerGame: PlayerGame = {
      playerId: player.playerId,
      gameId: this.game.gameId,
      turnCount: 1,
      currentMetricIndex: index,
    };
    this.playerGame.push(playerGame);
  }

  initPlayer(): void {
    // get players
    this.gameService.getAllPlayers().subscribe(players => this.players = players);
  }

  initGame(size: number): void {
    // init game
    this.gameService.initGame(size).subscribe(game => {
      this.game = game;
      this.calSizeBox();
    });
  }

  initCurrentPlayer(): void {
    this.currentPlayer = this.players[this.playerIndex];
  }

  calSizeBox() {
    const sizing = Math.sqrt(this.metricSize);
    this.styleBox = `calc(100% * (1/${sizing})`;
  }

  pushStats(player: Player, index: number): void {
    const stats: GameStats = {
      id: index,
      roomId: 1,
      gameId: this.game.gameId,
      playerId: player.playerId,
      turnNumber: 0,
      pointPerTurn: 0,
      accumScore: 0,
      currentMetricIndex: 0,
      metaDescription: `${player.playerName} : 0 point`,
      timestamp: (new Date()).toString(),
    };
    this.gameStats.push(stats);
  }

  resetState(): void {
    window.location.href = '/';
  }

  doYourTurn(): void {
    if (this.isFinish) {
      alert('game has ended !!');
      this.resetState();
      return;
    }
    const player = this.players[this.playerIndex];
    this.currentPlayer = player;
    const previousStatsArr = this.gameStats.filter(x => x.playerId == player.playerId);
    const prevStat = previousStatsArr.pop();
    const diceScore = this.randDice(6, 1);

    let possibleNextIndex = this.currentPlayer.currentIndex + diceScore;
    if(possibleNextIndex >= this.metricSize - 1) {
      possibleNextIndex = this.metricSize - 1;
      this.isFinish = true;
    }
    let possibleNextMatric = this.game.matrics.find(x => x.index === possibleNextIndex);
    let score = diceScore;
    let isDeclaredScore = false;
    while (possibleNextMatric?.isHasObstruct) {
      let nextIndex = possibleNextMatric.moveToIndex;
      const nextMetrics = this.game.matrics.find(x => x.index === nextIndex);
      if(nextIndex! >= this.metricSize - 1) {
        nextIndex = this.metricSize - 1;
        break;
      }
      let prevId = Number(prevStat?.id);
      const stats = {
        id: prevId++,
        roomId: 1,
        gameId: this.game.gameId,
        playerId: player.playerId,
        turnNumber: this.turnNumber,
        pointPerTurn: diceScore,
        accumScore: 0,
        currentMetricIndex: this.currentPlayer.currentIndex,
        metaDescription:
          isDeclaredScore === false ? `${player.playerName} : ${score} points | 
          ${possibleNextMatric?.description && possibleNextMatric.description !== '' ?
              possibleNextMatric.description : ''}` : '',
        timestamp: (new Date()).toString(),
      };
      this.gameStats.push(stats)
      possibleNextMatric = nextMetrics;
      this.moveMarker(player, possibleNextMatric!);
      isDeclaredScore = true;
    }
    this.currentPlayer.currentIndex = Number(possibleNextMatric?.index);
    if (!possibleNextMatric?.isHasObstruct) {
      let prevId = Number(prevStat?.id);
      const stats = {
        id: prevId++,
        roomId: 1,
        gameId: this.game.gameId,
        playerId: player.playerId,
        turnNumber: this.turnNumber,
        pointPerTurn: diceScore,
        accumScore: 0,
        currentMetricIndex: this.currentPlayer.currentIndex,
        metaDescription: isDeclaredScore === false ? `${player.playerName} : ${score} points` : '',
        timestamp: (new Date()).toString(),
      };
      this.gameStats.push(stats)
    }

    if (this.playerIndex < this.players.length - 1) {
      if(!possibleNextMatric?.isRepeatable) {
        this.playerIndex++;
      }
    } else {
      this.playerIndex = 0;
    }

    if (player.currentIndex === this.metricSize - 1) {
      this.isFinish = true;
    }

    this.turnNumber++;
  }

  moveMarker(player: Player, metric: Metric): void {
    console.log(metric);
  }

  randDice(max: number, min: number): number {
    const diceScore = Math.floor(Math.random() * (max - min + 1) + min);
    this.diceScore = diceScore;
    return diceScore;
  }

}
