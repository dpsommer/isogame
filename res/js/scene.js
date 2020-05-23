import DataManager from './datamanager.js';
import Graphics from './graphics.js';
import Grid from './grid.js';
import * as Layers from './layer.js';
import Mouse from './mouse.js';
import Config from './config.js';
import Items from './items.js';

let config = null;
let gameitems = null;

Config.then((conf) => {
  config = conf;
});

Items.then((items) => {
  gameitems = items;
});


class Scene {

	constructor(name) {
    this.name = name;
	}

	load() {
    return new Promise((resolve, reject) => {
      DataManager.loadJSON(PATHS.data + this.name + ".json").then((data) => {
        this.data = data;
        if (this.data.config) {
          Object.assign(config, this.data.config);
        }
        resolve(this);
      }).catch((reason) => {
        reject(reason);
      });
    });
	}

  init() {}

}

let game = null;

export class Game extends Scene {

  constructor() {
    if (!game) {
      super("game");
      // TODO: don't hardcode these!
      this.background = document.getElementById("background");
      this.foreground = document.getElementById("foreground");
      game = this;
    }
    return game;
  }

  init() {
    this.initGridLayer(config.baseGridScale);
    this.initSpriteLayer();
  }

  initGridLayer(scale) {
    this.grid = new Grid(config.gridX, config.gridY, config.origin, scale);
    let gridLayer = new Layers.GridLayer(this.background, this.grid);
    gridLayer.setLineColour(config.gridColour);
    Graphics.addLayer(gridLayer);
  }

  initSpriteLayer() {
    let spriteLayer = new Layers.SpriteLayer(this.foreground, this.grid);
    Graphics.addLayer(spriteLayer);

    this.foreground.onmousemove = (e) => {
      Mouse.x = e.clientX;
      Mouse.y = e.clientY;
      spriteLayer.setSelectedTile(Mouse);
    };

    this.foreground.onmousedown = (e) => {
      spriteLayer.select();
    }

    this.foreground.onmouseup = (e) => {
      if (!spriteLayer.selected) {
        // FIXME: testing purposes only
        let testItem = gameitems[0];
        spriteLayer.addSprite(testItem.width, testItem.height, spriteLayer.selectedTile, PATHS.img + testItem.img);
      }
      spriteLayer.update = true;
      spriteLayer.deselect();
    };
  }

}

let inventory = null;

export class Inventory extends Scene {

  constructor() {
    if (!inventory) {
      super("inventory");
      // TODO: don't hardcode these!
      this.background = document.getElementById("background");
      this.foreground = document.getElementById("foreground");
      inventory = this;
    }
    return inventory;
  }

  init() {
    this.initSpriteLayer();
  }

  initSpriteLayer() {
    let spriteLayer = new Layers.SpriteLayer(this.foreground);
    Graphics.addLayer(spriteLayer);
  }

}
