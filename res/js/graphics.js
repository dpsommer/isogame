window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;

function drawLoop() {
  requestAnimationFrame(drawLoop);
  // consider changing drawloop update to be handled per layer
  graphics.draw();
}

let graphics = null;

class Graphics {
  
  constructor() {
    if (!graphics) {
      this.layers = [];
      graphics = this;
      drawLoop();
    }
    return graphics;
  }
  
  addLayer(layer) {
    this.layers.push(layer);
  }

  draw() {
    this.layers.forEach(function(layer) {
      layer.draw();
    });
  }
  
  clear() {
    this.layers.forEach(function(layer) {
      layer.clear();
    });
    this.layers = [];
  }

}

new Graphics();

export default graphics;
