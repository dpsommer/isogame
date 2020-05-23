import DataManager from './datamanager.js';

let items = null;
let loadItems = null;

export default loadItems = new Promise((resolve, reject) => {
  if (items) {
    resolve(items);
  } else {
    DataManager.loadJSON(PATHS.data + "gameitems.json")
      .then((data) => {
        items = data;
        resolve(items);
      })
      .catch((reason) => {
        reject(reason);
      });
  }
});