import Point from './point.js';

let instance = null;

class Mouse extends Point {
	
	constructor(x, y) {
    if (!instance) {
      super();
      this.x = x;
      this.y = y;
      instance = this;
    }
    
    return instance;
  }
	
}

new Mouse(0, 0);

export default instance;