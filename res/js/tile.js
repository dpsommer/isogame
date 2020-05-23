import Point from './point.js';
import Config from './config.js';

let config = null;

Config.then((conf) => {
  config = conf;
});

export default class Tile {

  constructor(top, scale) {
    this.intersects = [
      top,
      new Point(
        top.x + scale.x.horizontal * Tile.WIDTH_HALF,
        top.y + scale.y.vertical * Tile.HEIGHT_HALF
      ),
      new Point(
        top.x + scale.x.horizontal * Tile.WIDTH_HALF + scale.x.vertical * Tile.WIDTH_HALF,
        top.y + scale.y.vertical * Tile.HEIGHT_HALF + scale.y.horizontal * Tile.HEIGHT_HALF
      ),
      new Point(
        top.x + scale.x.vertical * Tile.WIDTH_HALF,
        top.y + scale.y.horizontal * Tile.HEIGHT_HALF
      )
    ];
  }

  static get WIDTH() {
    return config.tileUnitSize * config.tileScale.width;
  }

  static get WIDTH_HALF() {
    return Tile.WIDTH / 2;
  }

  static get HEIGHT() {
    return config.tileUnitSize * config.tileScale.height;
  }

  static get HEIGHT_HALF() {
    return Tile.HEIGHT / 2;
  }

}