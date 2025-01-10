import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-games',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss',
})
export class GamesComponent {
  board: string[][] = Array.from({ length: 3 }, () => Array(3).fill(''));
  currentPlayer: string = 'X';
  winner: string | null = null;

  makeMove(row: number, col: number): void {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWinner()) {
        this.winner = this.currentPlayer;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): boolean {
    const lines = [
      ...this.board,
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    return lines.some((line) =>
      line.every((cell) => cell === this.currentPlayer)
    );
  }

  resetGame(): void {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(''));
    this.currentPlayer = 'X';
    this.winner = null;
  }
}
