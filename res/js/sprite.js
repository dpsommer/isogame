export default class Sprite extends Image {
  
  constructor(w, h, img, mask=null) {
    super(w, h);
    this.src = img;
    this.mask = mask;
  }
  
}