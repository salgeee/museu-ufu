import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  image: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-puzzles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puzzles.component.html',
  styleUrls: ['./puzzles.component.css']
})
export class PuzzlesComponent implements OnInit {
  timeElapsed: string = '00:00';
  private timerInterval: any;
  private startTime: Date = new Date();
  cards: Card[] = [];
  private flippedCards: Card[] = [];
  private canFlip: boolean = true;
  gameWon: boolean = false;

  ngOnInit() {
    this.startNewGame();
    this.gameWon = false;
  }

  startNewGame() {
    // Resetar o timer
    this.gameWon = false;
    this.startTime = new Date();
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
    this.startTimer();

    // Inicializar as cartas
    const images = [
      'public/images/charles_babbage.png',
      'public/images/ada_lovelace.png',
      'public/images/eniac.png',
      'public/images/alan_turing.png',
      'public/images/transitor.png',
      'public/images/internet.png',
      'public/images/steve_jobs.png',
      'public/images/bill_gates.png',
      'public/images/quantum.png'
    ];

    // Criar pares de cartas
    this.cards = [];
    let id = 1;
    images.forEach(image => {
      this.cards.push({ id: id++, image, isFlipped: false, isMatched: false });
      this.cards.push({ id: id++, image, isFlipped: false, isMatched: false });
    });

    // Embaralhar as cartas
    this.shuffleCards();
  }

  private shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  private startTimer() {
    this.timerInterval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - this.startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      this.timeElapsed = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }

  flipCard(card: Card) {
    if (!this.canFlip || card.isFlipped || card.isMatched) {
      return;
    }

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.canFlip = false;
      this.checkMatch();
    }
  }

  private checkMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.image === card2.image) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.flippedCards = [];
      this.canFlip = true;

      // Verificar se o jogo acabou
      if (this.cards.every(card => card.isMatched)) {
        clearInterval(this.timerInterval);
        setTimeout(() => {
          this.gameWon = true;
        }, 500);
      }
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.flippedCards = [];
        this.canFlip = true;
      }, 1000);
    }
  }
}
