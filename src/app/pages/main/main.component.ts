import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameStats } from 'src/app/models/game-stats';
import { User } from 'src/app/models/user';
import { GameService } from 'src/app/services/game.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  players: User[] = [];
  game!: Game;
  gameStats: GameStats[] = [];
  constructor(private userService: UserService, private gameService: GameService) { 
  }

  ngOnInit(): void {
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
        gameId: this.game.gameId,
        userId: player.userId,
        turnNumber: 0,
        pointPerTurn: 0,
        accumScore: 0,
        metaDescription: `${player.username} : 0 point | เริ่มเกม`,
        timestamp: (new Date()).toString(),
      };
      this.gameStats.push(stats)
    });
  }

}
