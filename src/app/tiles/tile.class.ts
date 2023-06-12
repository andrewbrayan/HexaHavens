export class Tile {
  private readonly _terrain: string;
  private readonly _type: string;
  private readonly _imagen: string;

  constructor(terrain: string, type: string) {
    const path = `assets/tiles/terrain/${terrain}/${terrain}`;
    this._terrain = terrain;
    this._type = type;
    this._imagen = `${path}_${type ? type+'_1' : type }.png`;
  }

  get terrain(): string {
    return this._terrain;
  }

  get type(): string {
    return this._type;
  }

  get imagen(): string {
    return this._imagen;
  }
}
