import { Tile } from './tile.class';

export class TileFactory {
  private static terrain: string[] = ['dirt', 'grass', 'sand'];
  private static type: string[] = ['', 'forest', 'stones'];

  static createRandomTile(): Tile {
    const randomtypeIndex = Math.floor(Math.random() * this.type.length);
    const randomType = this.type[randomtypeIndex];;
    const randomTerrainIndex = Math.floor(Math.random() * this.terrain.length);
    const randomTerrain = this.terrain[randomTerrainIndex];

    return new Tile(randomTerrain, randomType);
  }
}
