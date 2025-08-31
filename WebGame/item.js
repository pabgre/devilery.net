class Item {

  constructor(type) {
    this.r = 70;
    this.x = width;
    this.y =height -1.2*this.r + floor;
    this.type = type;
  }

  move() {
    this.x -= 4;
  }

  hits(rider) {
    if (this.picked){
      return (false);
    }
    let x2 = this.x + this.r * 0.5;
    let y2 = this.y + this.r * 0.5;
    let x1 = rider.x + rider.r * 0.5;
    let y1 = rider.y + rider.r * 0.5;
    return (collideCircleCircle(x1, y1, this.r * 0.7, x2, y2, rider.r * 0.7));
  }



  show() {
      image(itemImg, this.x, this.y, this.r, this.r);
      if (this.type == 0){
        strokeWeight(3);
        stroke("#ff5425");
        linedash(riderPos + 50, height + floor/2, this.x + this.r/2 - 5, height + floor/2, 10)
        noStroke();
        fill("#ff5425")
        ellipse(riderPos + 50, height + floor/2, 12, 12);
        ellipse(this.x + this.r/2, height + floor/2, 12, 12);
      }
  }

  isOut(){
    return (this.x < -this.r)
  }

}
