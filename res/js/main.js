import SceneManager from './scenemanager.js';
import Config from './config.js';

Config.then((config) => {
  SceneManager.scene = config.mainScene;
});
