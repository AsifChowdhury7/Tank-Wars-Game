class l3Wall {
  constructor(x, y, w, h) {
    this.width = w;
    this.height = h;
    this.fillColor = color(220,220,220)
    this.loc = createVector(x, y);
  }
  
  show() {
    fill(this.fillColor);
    noStroke();
    // ellipse(this.loc.x+5,this.loc.y+5,this.width+3)
    rect(this.loc.x, this.loc.y, this.width, this.height);
  }
   
}