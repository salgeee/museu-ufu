import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Position {
  row: number;
  col: number;
}

export interface Word {
  word: string;
  found: boolean;
  positions: Position[];
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly GRID_SIZE = 15;
  private readonly WORDS = [
    'TYPESCRIPT',
    'ANGULAR',
    'MICROCHIP',
    'ZUSE',
    'TRANSISTOR',
    'ENIAC',
    'PASCALINE',
    'ALGORITMO',
    'HARDWARE',
    'SOFTWARE'
  ];

  private grid: string[][] = [];
  private words: Word[] = [];
  private elapsedTime = new BehaviorSubject<number>(0); // Tempo decorrido em segundos
  private timer: any;
  private foundWords = new BehaviorSubject<number>(0);

  constructor() {
    this.initializeGame();
  }

  private initializeGame(): void {
    // Inicializa o grid vazio
    this.grid = Array(this.GRID_SIZE).fill(null)
      .map(() => Array(this.GRID_SIZE).fill(''));

    // Prepara as palavras
    this.words = this.WORDS.map(word => ({
      word,
      found: false,
      positions: []
    }));

    // Coloca as palavras no grid
    this.placeWords();

    // Preenche os espaços vazios com letras aleatórias
    this.fillEmptySpaces();

    // Inicia o timer
    this.startTimer();
  }

  private placeWords(): void {
    const directions = [
      [0, 1],   // horizontal
      [1, 0],   // vertical
      [1, 1],   // diagonal para baixo
      [-1, 1],  // diagonal para cima
    ];

    for (const wordObj of this.words) {
      let placed = false;
      while (!placed) {
        const direction = directions[Math.floor(Math.random() * directions.length)];
        const word = wordObj.word;
        
        const startRow = Math.floor(Math.random() * this.GRID_SIZE);
        const startCol = Math.floor(Math.random() * this.GRID_SIZE);

        if (this.canPlaceWord(word, startRow, startCol, direction)) {
          this.placeWord(wordObj, startRow, startCol, direction);
          placed = true;
        }
      }
    }
  }

  private canPlaceWord(word: string, startRow: number, startCol: number, direction: number[]): boolean {
    if (startRow < 0 || startCol < 0) return false;
    
    for (let i = 0; i < word.length; i++) {
      const row = startRow + (direction[0] * i);
      const col = startCol + (direction[1] * i);

      if (row >= this.GRID_SIZE || col >= this.GRID_SIZE || row < 0 || col < 0) {
        return false;
      }

      if (this.grid[row][col] !== '' && this.grid[row][col] !== word[i]) {
        return false;
      }
    }
    return true;
  }

  private placeWord(wordObj: Word, startRow: number, startCol: number, direction: number[]): void {
    const positions: Position[] = [];
    
    for (let i = 0; i < wordObj.word.length; i++) {
      const row = startRow + (direction[0] * i);
      const col = startCol + (direction[1] * i);
      this.grid[row][col] = wordObj.word[i];
      positions.push({ row, col });
    }

    wordObj.positions = positions;
  }

  private fillEmptySpaces(): void {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.GRID_SIZE; i++) {
      for (let j = 0; j < this.GRID_SIZE; j++) {
        if (this.grid[i][j] === '') {
          this.grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.elapsedTime.next(this.elapsedTime.value + 1);
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  public endGame(): void {
    this.stopTimer();
  }

  checkWord(selectedPositions: Position[]): boolean {
    for (const word of this.words) {
      if (!word.found && this.comparePositions(selectedPositions, word.positions)) {
        word.found = true;
        this.foundWords.next(this.foundWords.value + 1);
        return true;
      }
    }
    return false;
  }

  private comparePositions(pos1: Position[], pos2: Position[]): boolean {
    if (pos1.length !== pos2.length) return false;
    
    const isForward = JSON.stringify(pos1) === JSON.stringify(pos2);
    const isBackward = JSON.stringify(pos1) === JSON.stringify([...pos2].reverse());
    
    return isForward || isBackward;
  }

  getGrid(): string[][] {
    return this.grid;
  }

  getWords(): Word[] {
    return this.words;
  }

  getElapsedTime() {
    return this.elapsedTime.asObservable();
  }

  getFoundWords() {
    return this.foundWords.asObservable();
  }

  isGameComplete(): boolean {
    return this.words.every(word => word.found);
  }

  resetGame(): void {
    this.stopTimer();
    this.elapsedTime.next(0);
    this.foundWords.next(0);
    this.initializeGame();
  }
} 