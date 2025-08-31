class Enemy {

  constructor(type, subtype) {
    this.r = 70;
    this.x = width;
    this.y = type == 0 ? height - this.r + floor: height - 2.3 * this.r + floor;
    this.type = type;
    this.subtype = subtype;
  }

  move() {
    this.x -= 5;
  }

    hits(rider) {
    let x2 = this.x + this.r * 0.5;
    let y2 = this.y + this.r * 0.6;
    let x1 = rider.x + rider.r * 0.5;
    let y1 = rider.y + rider.r * 0.5;
    return collideCircleCircle(x1, y1, this.r*0.8, x2, y2, rider.r * 0.7);
  }

  show() {
    if (this.type == 0){
      if (this.subtype == 0){
              image(vntaImg, this.x, this.y, this.r, this.r);
      }else{
        image(vntbImg, this.x, this.y, this.r, this.r);
      }

    }
    else {
      image(dronImg, this.x, this.y, this.r, this.r);
    }



    //fill(255, 50);
    //ellipse(this.x + this.r * 0.5, this.y + this.r * 0.6, this.r * 0.7, this.r * 0.7);

  }

  isOut(){
    return (this.x < -this.r)
  }

}
