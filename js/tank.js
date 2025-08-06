class Tank {
  constructor(x, y, color, leftKey, rightKey, upKey, downKey, angle) {
    this.direction = 0
    this.width = 70;
    this.height = 45;
    this.x = x + this.width / 2
    this.y = y + this.height / 2

    this.loc = createVector(this.x, this.y)

    this.color = color;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.upKey = upKey;
    this.downKey = downKey;
    this.speed = 2.5;
    this.angle = angle;
    this.bullets = [];

  }




  update() {
    if (keyIsDown(this.leftKey)) {
      this.angle -= 0.09;
    }

    if (keyIsDown(this.rightKey)) {
      this.angle += 0.09;
    }

    if (keyIsDown(this.upKey)) {

      let posX = this.loc.x + this.speed * cos(this.angle);
      let posY = this.loc.y + this.speed * sin(this.angle);
      let hasCollided = false; // set the initial value of hasCollided to false
      for (let i = 0; i < walls.length; i++) {
        if (this.hasCollision(walls[i])) {
          hasCollided = true; // set hasCollided to true if there is a collision
          break;
        }
      }
      if (!hasCollided && posX - this.width / 2 > 0 && posX + this.width / 2 < width && posY - this.height / 2 > 0 && posY + this.height / 2 < height) {
        this.loc.x = posX;
        this.loc.y = posY;
      }
    }
    if (keyIsDown(this.downKey)) {
      this.direction = -1
      let posX = this.loc.x - this.speed * cos(this.angle);
      let posY = this.loc.y - this.speed * sin(this.angle);
      let hasCollided = false; // set the initial value of hasCollided to false
      for (let i = 0; i < walls.length; i++) {
        if (this.hasCollision(walls[i])) {
          hasCollided = true; // set hasCollided to true if there is a collision
          break;
        }
      }
      if (!hasCollided && posX - this.width / 2 > 0 && posX + this.width / 2 < width && posY - this.height / 2 > 0 && posY + this.height / 2 < height) {
        this.loc.x = posX;
        this.loc.y = posY;
      }
    }
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (this.bullets[i].offscreen()) {
        this.bullets.splice(i, 1);
      }
    }
  }


  show() {
    stroke("white")
    noFill()
    ellipseMode(CORNER)
    //ellipse(this.loc.x, this.loc.y, 65.2)
    push();
    translate(this.loc.x + this.width
      / 2, this.loc.y + this.height / 2);
    rotate(this.angle);

    fill(this.color);
    rect(-this.width
      / 2, -this.height / 2, this.width
      , this.height);
    fill(255);
    rect(this.width
      / 2 - 5, -5, 10, 10);
    fill('white')
    pop();

    for (let i = 0; i < this.bullets.length; i++) {
      this.bullets[i].show();
    }
  }

  fire() {
    let offsetX = (this.width
      / 2 + 10) * cos(this.angle);
    let offsetY = (this.width
      / 2 + 10) * sin(this.angle);

    let bullet = new Bullet(this.loc.x + this.width / 2
      + offsetX, this.loc.y + this.height / 2 + offsetY, this.angle);
    this.bullets.push(bullet);
  }


  hasCollision(other) {
    let left = this.loc.x
    let right = this.loc.x + this.width
    let top = this.loc.y
    let bot = this.loc.y + this.height

    return left <= other.loc.x &&
      right >= other.loc.x + other.width &&
      top <= other.loc.y &&
      bot >= other.loc.y + other.height
  }

}