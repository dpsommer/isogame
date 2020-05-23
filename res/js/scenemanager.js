import Graphics from './graphics.js';
import * as Scenes from './scene.js';

let scenemanager = null;

class SceneManager {

  constructor() {
    if (!scenemanager) {
      scenemanager = this;
    }
    return scenemanager;
  };

  get scene() {
    return this._scene.name;
  };
  
  set scene(scene) {
    if (scene) {
      this._scene = new Scenes[scene]();
      this._scene.load().then(() => {
        Graphics.clear();
        this._scene.init();
      }).catch((reason) => {
        console.error(reason);
      });
    }
  }

}

new SceneManager();

export default scenemanager;