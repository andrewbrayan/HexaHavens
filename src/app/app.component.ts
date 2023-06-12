import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Tile } from './tiles/tile.class';
import { Board } from './board/board.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef;
  board: Board = new Board();
  grid: (Tile | null | undefined)[][];

  isMouseDown = false;
  startX: any;
  startY: any;
  scrollLeft: any;
  scrollTop: any;

  constructor() {
    this.grid = this.board.grid
  }

  ngAfterViewInit(): void {
    const tablero = this.container.nativeElement

    tablero.addEventListener('mousedown', (e: any) => {
      this.isMouseDown = true;
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.scrollLeft = tablero.scrollLeft;
      this.scrollTop = tablero.scrollTop;
    });

    tablero.addEventListener('mousemove', (e: any) => {
      if (!this.isMouseDown) return;

      e.preventDefault();
      var x = e.clientX - this.startX;
      var y = e.clientY - this.startY;
      tablero.scrollLeft = this.scrollLeft - x;
      tablero.scrollTop = this.scrollTop - y;
    });

    tablero.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    tablero.addEventListener('mouseleave', () => {
      this.isMouseDown = false;
    });
  }
}
