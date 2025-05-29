import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService, Position, Word } from '../service/game.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-word-search',
  templateUrl: './word-search.component.html',
  styleUrls: ['./word-search.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class WordSearchComponent implements OnInit, OnDestroy {
  grid: string[][] = [];
  words: Word[] = [];
  elapsedTime: number = 0;
  foundWordsCount: number = 0;
  selectedCells: Position[] = [];
  isSelecting: boolean = false;
  gameComplete: boolean = false;
  showCongratulations: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.grid = this.gameService.getGrid();
    this.words = this.gameService.getWords();

    this.subscriptions.push(
      this.gameService.getElapsedTime().subscribe(time => {
        this.elapsedTime = time;
      })
    );

    this.subscriptions.push(
      this.gameService.getFoundWords().subscribe(count => {
        this.foundWordsCount = count;
        if (count === this.words.length) {
          this.gameComplete = true;
          this.gameService.endGame();
          this.showCongratulations = true;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  onMouseDown(row: number, col: number): void {
    this.isSelecting = true;
    this.selectedCells = [{ row, col }];
  }

  onMouseOver(row: number, col: number): void {
    if (this.isSelecting) {
      const lastCell = this.selectedCells[0];

      // Verifica se é uma seleção válida (mesma linha, coluna ou diagonal)
      const rowDiff = Math.abs(row - lastCell.row);
      const colDiff = Math.abs(col - lastCell.col);

      if (row === lastCell.row || col === lastCell.col || rowDiff === colDiff) {
        this.selectedCells = this.getPositionsBetween(lastCell, { row, col });
      }
    }
  }

  onMouseUp(): void {
    if (this.isSelecting) {
      this.isSelecting = false;
      if (this.gameService.checkWord(this.selectedCells)) {
        // Palavra encontrada!
      } else {
        this.selectedCells = [];
      }
    }
  }

  private getPositionsBetween(start: Position, end: Position): Position[] {
    const positions: Position[] = [];
    const rowDir = Math.sign(end.row - start.row) || 0;
    const colDir = Math.sign(end.col - start.col) || 0;

    let currentRow = start.row;
    let currentCol = start.col;

    while (true) {
      positions.push({ row: currentRow, col: currentCol });

      if (currentRow === end.row && currentCol === end.col) break;

      currentRow += rowDir;
      currentCol += colDir;
    }

    return positions;
  }

  isCellSelected(row: number, col: number): boolean {
    return this.selectedCells.some(pos => pos.row === row && pos.col === col);
  }

  isWordFound(word: string): boolean {
    return this.words.find(w => w.word === word)?.found || false;
  }

  closeModal(): void {
    this.showCongratulations = false;
  }

  resetGame(): void {
    this.gameService.resetGame();
    this.grid = this.gameService.getGrid();
    this.words = this.gameService.getWords();
    this.selectedCells = [];
    this.gameComplete = false;
    this.showCongratulations = false;
  }
}
