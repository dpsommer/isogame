let datamanager = null;

class DataManager {
  
  constructor() {
    if (!datamanager) {
      datamanager = this;
    }
    return datamanager;
  }
  
  loadJSON(file) {
 		return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();
      xhttp.open("GET", file, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.onload = () => resolve(JSON.parse(xhttp.responseText));
      xhttp.onerror = () => reject(xhttp.statusText);
      xhttp.send();
    });
  }
  
}

new DataManager();

export default datamanager;