import Point from './point.js';
import Tile from './tile.js';

export default class Grid {

  constructor(sizeX, sizeY, origin, scale) {
    this.size = { x: sizeX, y: sizeY };
    this.origin = origin;
    this.scale = scale;
    this.tiles = [];
    this.build();
  }

  toCoordinates(p) {
    return new Point(
      Math.floor(((p.x - this.origin.x) / (Tile.WIDTH_HALF) + (p.y - this.origin.y) / (Tile.HEIGHT_HALF)) / 2),
      Math.floor(((p.y - this.origin.y) / (Tile.HEIGHT_HALF) - (p.x - this.origin.x) / (Tile.WIDTH_HALF)) / 2)
    );
  }

  toScreen(p) {
    return new Point(
      (p.x - p.y) * (Tile.WIDTH_HALF) + this.origin.x,
      (p.x + p.y) * (Tile.HEIGHT_HALF) + this.origin.y
    );
  }

  snap(p) {
    let coords = this.toCoordinates(p)
    coords.x = Math.max(0, Math.min(this.size.x - 1, coords.x));
    coords.y = Math.max(0, Math.min(this.size.y - 1, coords.y));
    p = this.toScreen(coords);
    return new Point(p.x, p.y);
  }

  build() {
    for (var i = 0; i < this.size.x; i++) {
      this.tiles[i] = [];
      for (var j = 0; j < this.size.y; j++) {
        this.tiles[i][j] = new Tile(
          new Point(
            this.origin.x + ((i * this.scale.x.horizontal + j * this.scale.x.vertical) * Tile.WIDTH_HALF),
            this.origin.y + ((i * this.scale.y.vertical + j * this.scale.y.horizontal) * Tile.HEIGHT_HALF)
          ), this.scale
        );
      }
    }
  }

}
