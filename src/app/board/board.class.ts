import { TileFactory } from '../tiles/tile-factory';
import { Tile } from '../tiles/tile.class';

export class Board {
  private _grid: (Tile | null | undefined)[][];
  private _score: number;

  constructor() {
    this._grid = this.generateBoard();
    this._score = 0;
    this.exploreTiles([0,0])
  }

  get grid() {
    return this._grid;
  }

  get score() {
    return this._score;
  }

  private generateBoard(): (Tile | undefined)[][] {
    const newTile = TileFactory.createRandomTile();
    let newGrid: (Tile | undefined)[][] = [];
    for (let y = 0; y < 9; y++) {
      newGrid[y] = this.generateRow(15);
    }

    const middleYBoard = Math.floor(newGrid.length / 2);
    const middleXBoard = Math.floor(newGrid[0].length / 2);
    newGrid[middleYBoard][middleXBoard] = newTile

    return newGrid;
  }

  private generateRow(length: number): undefined[] {
    let newrow: undefined[] = [];
    for (let x = 0; x < length; x++) {
      newrow[x] = undefined;
    }

    return newrow;
  }

  public setTile(cords: number[]) {
    const [row, col] = cords;
    const newTile = TileFactory.createRandomTile();

    if (this._grid[row][col] === null) {
      this._grid[row][col] = newTile;
      this.addclearTiles(cords);
      this.exploreTiles([0,0])
    }
  }

  private exploreTiles(cords: number[], visited: boolean[][] = []) {
    const [row, col] = cords;
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];

    if (visited.length === 0) {
      for (let row = 0; row < this._grid.length; row++) {
        visited[row] = new Array(this._grid[0].length).fill(false);
      }
    }

    if (visited[row][col]) {
      return;
    }

    visited[row][col] = true;

    for (let [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (newRow >= 0 && newRow < this._grid.length && newCol >= 0 && newCol < this._grid[0].length) {
        this.exploreTiles([newRow, newCol], visited)

        if (this._grid[newRow][newCol] === undefined) {
          this._grid[newRow][newCol] = null
        }
      }
    }
  }

  private addclearTiles(cords: number[]) {
    const [row, col] = cords;
    const middleYBoard = Math.floor(this._grid.length / 2);
    const middleXBoard = Math.floor(this._grid[row].length / 2);
    const rowTilesCount = this._grid[row].filter((tile) => tile).length;

    if (row < middleYBoard && rowTilesCount == 1 && row == 0) {
      let newRow = this.generateRow(this._grid[row].length)
      this._grid.unshift([...newRow], [...newRow]);
    }

    if (row > middleYBoard && rowTilesCount == 1 && row == this._grid.length - 1) {
      let newRow = this.generateRow(this._grid[row].length)
      this._grid.push([...newRow], [...newRow]);
    }

    if (col < middleXBoard && col == 0) {
      for (let i = 0; i < this._grid.length; i++) {
        this._grid[i].unshift(null, null);
      }
    }

    if (col > middleXBoard && col == this._grid[row].length - 1) {
      for (let i = 0; i < this._grid.length; i++) {
        this._grid[i].push(null, null);
      }
    }
  }
}
