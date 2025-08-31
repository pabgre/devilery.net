class Rider {

  constructor() {
    this.r = 100;
    this.x = riderPos;
    this.y = height - this.r + floor;
    this.vy = 0;
    this.gravity = 0.5;
  }

  jump() {
    if (this.y >= height - this.r + floor -30) {
      this.vy = -12;
    }

  }

  hits(train) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = train.x + train.r * 0.5;
    let y2 = train.y + train.r * 0.5;
    return collideCircleCircle(x1, y1, this.r * 0.7, x2, y2, train.r * 0.7);
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r + floor);
  }

  show() {
    image(riderImg, this.x, this.y, this.r, this.r);

    //fill(255, 50);
    //ellipse(this.x + this.r * 0.5, this.y + this.r * 0.5, this.r * 0.7, this.r *0.7);
  }
}
