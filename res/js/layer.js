import Sprite from './sprite.js';
import Point from './point.js';
import Tile from './tile.js';

export class Layer {

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext("2d");
    this.update = true;
	}

  setLineColour(colour) {
    this.ctx.strokeStyle = colour;
  }

  drawPolygon(polygon) {
    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0].x, polygon[0].y);
    for (let i = 1; i < polygon.length; i++){
      let intersect = polygon[i];
      this.ctx.lineTo(intersect.x, intersect.y);
    }
    this.ctx.lineTo(polygon[0].x, polygon[0].y);
    this.ctx.stroke();
  }

  draw() {}

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  update() {
    this.update = true;
  }

}

export class SpriteLayer extends Layer {

  constructor(canvas, grid) {
    super(canvas);
    this.grid = grid;
    this.selected = null;
    this.lastKnown = null;
    this.selectedTile = this.grid.tiles[0][0];
    this.tileSpriteMap = new Map();
  }

  getSpriteOrigin(t) {
    // TODO: can this function be moved or rewritten?
    let tile = t || this.selectedTile;
    let p = tile.intersects[0];
    return new Point(
      p.x - Tile.WIDTH / 4,
      p.y - Tile.HEIGHT / 4
    );
  }

  addSprite(w, h, tile, image) {
    let sprite = new Sprite(w, h, image);
    this.tileSpriteMap.set(this.selectedTile, sprite);
    sprite.onload = () => { this.update = true; }
  }

  setSelectedTile(p) {
    let previousTile = this.selectedTile;
    let coords = this.grid.toCoordinates(this.grid.snap(p));
    this.selectedTile = this.grid.tiles[coords.x][coords.y];
    if (previousTile != this.selectedTile) this.update = true;
  }

  select() {
    this.selected = this.tileSpriteMap.get(this.selectedTile);
    this.tileSpriteMap.delete(this.selectedTile);
    this.lastKnown = this.selectedTile;
    this.update = true;
  }

  deselect() {
    if (this.selected) {
      let tile = this.colliding() ? this.lastKnown : this.selectedTile;
      this.tileSpriteMap.set(tile, this.selected);
      this.selected = null;
    }
  }

  colliding() {
    return this.tileSpriteMap.has(this.selectedTile);
  }

  tintSprite(s, o, c) {
    let imgData = this.ctx.getImageData(o.x, o.y, s.width, s.height);
    for (var i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 3] != 0) {
        imgData.data[i] = Math.max(c[0], imgData.data[i]);
        imgData.data[i + 1] = Math.max(c[1], imgData.data[i + 1]);
        imgData.data[i + 2] = Math.max(c[2], imgData.data[i + 2]);
      }
    }
    this.ctx.putImageData(imgData, o.x, o.y);
  }

  draw() {
    // TODO: draw sprites in z-index order
    if (this.update) {
      this.clear();
      // TODO: implement nicer selection graphic
      this.drawPolygon(this.selectedTile.intersects);
      for (var [tile, sprite] of this.tileSpriteMap) {
        let o = this.getSpriteOrigin(tile);
        this.ctx.drawImage(sprite, o.x, o.y);
      }
      if (this.selected) {
        this.ctx.globalAlpha = 0.5;
        let colliding = this.colliding();
        let o = this.getSpriteOrigin();
        this.ctx.drawImage(this.selected, o.x, o.y);
        if (colliding) this.tintSprite(this.selected, o, [200, 0, 0]);
        this.ctx.globalAlpha = 1;
      }
      this.ctx.lineWidth = 1;
      this.update = false;
    }
  }

}

export class GridLayer extends Layer {

  constructor(canvas, grid) {
    super(canvas);
    this.grid = grid;
  }

  draw() {
    if (this.update) {
      this.clear();
      for (var i = 0; i < this.grid.size.x; i++) {
        for (var j = 0; j < this.grid.size.y; j++) {
          this.drawPolygon(this.grid.tiles[i][j].intersects);
        }
      }
      this.update = false;
    }
  }

}
