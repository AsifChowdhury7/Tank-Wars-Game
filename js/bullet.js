class Bullet {
  constructor(x, y, angle) {
    this.x = x + (cos(angle) * 30);
    this.y = y + (sin(angle) * 30);

    this.loc = createVector(this.x, this.y)

    this.vx = 8 * cos(angle);
    this.vy = 8 * sin(angle);

    this.width = 4
    this.height = 4
    this.frameCount = 0;
    this.remove = false;
  }

  update() {
    this.loc.x += this.vx;
    this.loc.y += this.vy;
    this.frameCount++;
    if (this.frameCount > 60) {
      this.remove = true;
    }
  }

  offscreen() {
    return (this.loc.x < 0 || this.loc.x > width || this.loc.y < 0 || this.loc.y > height);
  }

  show() {
    noStroke();
    fill(255);
    rect(this.loc.x, this.loc.y, this.width, this.height);
    ellipseMode(CENTER)

  }

  hasCollision(wall) {
    
  let bulletLeft = this.loc.x;
  let bulletRight = this.loc.x + this.width;
  let bulletTop = this.loc.y;
  let bulletBottom = this.loc.y + this.height;
  
  let wallLeft = wall.loc.x;
  let wallRight = wall.loc.x + wall.width;
  let wallTop = wall.loc.y;
  let wallBottom = wall.loc.y + wall.height;

  if (bulletRight < wallLeft || bulletLeft > wallRight) {
    return false;
  }
  if (bulletBottom < wallTop || bulletTop > wallBottom) {
    return false;
  }

  return true;
}



  
}