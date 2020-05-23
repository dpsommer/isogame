import DataManager from './datamanager.js';

let config = null;
let loadConfig = null;

export default loadConfig = new Promise((resolve, reject) => {
  if (config) {
    resolve(config);
  } else {
    DataManager.loadJSON(PATHS.data + "config.json")
      .then((data) => {
        config = data;
        resolve(config);
      })
      .catch((reason) => {
        reject(reason);
      });
  }
});