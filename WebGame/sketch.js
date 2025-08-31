let rider;
let riderImg;
let dronImg;
let vntaImg;
let vntbImg;
let enemies = [];
let items = [];
let lastSpawn = 0;
let lastEnemy = 0;
let floor = -60;
let currentFrame = 0;
let currentItem;
let gameOver=false;
let started = false;
let repeatImg;
let riderPos=150;
let completed=0;
let canContinue = true;

let numFrames = {
  dron: 7,
  rider: 10,
  vnta: 7,
  vntb: 12
};

let frames = {
  dron: [],
  rider: [],
  vnta: [],
  vntb: []
}

let itemsFrames;

let itemImg;

function preload() {
  repeatImg=loadImage("repeat.png");
  currentItem = int(random(1, 4));
  for (var i = 0; i < numFrames.dron; i++) {
    frames.dron.push(loadImage('DronImgs/' + (i + 1) + '.png'))
  }
  for (var i = 0; i < numFrames.rider; i++) {
    frames.rider.push(loadImage('RiderImgs/' + (i + 1) + '.png'))
  }
  for (var i = 0; i < numFrames.vnta; i++) {
    frames.vnta.push(loadImage('VNTAImgs/' + (i + 1) + '.png'))
  }
  for (var i = 0; i < numFrames.vntb; i++) {
    frames.vntb.push(loadImage('VNTBImgs/' + (i + 1) + '.png'))
  }

  itemsFrames = [loadImage('ItemsImgs/here.png'),
    loadImage('ItemsImgs/burrito.png'),
    loadImage('ItemsImgs/burger.png'),
    loadImage('ItemsImgs/pizza.png')

  ]

  riderImg = frames.rider[0];
  dronImg = frames.dron[0];
  vntaImg = frames.vnta[0];
  vntbImg = frames.vntb[0];
  itemImg = itemsFrames[currentItem];
}

function mousePressed() {

  if (gameOver && canContinue){
    canContinue = false;
    enemies = [];
    items = [];
    gameOver = false;
    currentItem = int(random(1, 4));
    completed=0;
  }else{
    rider.jump();
  }
}

function setup() {
  frameRate(60)
  createCanvas(window.innerWidth, 300);
  if (window.innerWidth < 600){
    riderPos=0;
  }
  rider = new Rider();
}

document.getElementsByTagName("BODY")[0].addEventListener('touchstart', function() {
  if (gameOver && canContinue){
    enemies = [];
    items = [];
    gameOver = false;
    currentItem = int(random(1, 4));
    completed=0;
  }else{
    rider.jump();
  }
});

function keyPressed() {

  if (gameOver && canContinue){
    enemies = [];
    items = [];
    gameOver = false;
    currentItem = int(random(1, 4));
    completed=0;
  }else{
    rider.jump();
  }
}

function draw() {
  if(!gameOver){
    let trainOut = false;
    let itemOut = false;
    lastSpawn++;


    if (random(1) < 0.05 && (lastSpawn > 60 || (lastEnemy == 0 && (lastSpawn < 18 && lastSpawn > 10)))) {

      lastEnemy = lastEnemy == 0 && lastSpawn < 18 ? 0 : int(random(0, 2));
      enemies.push(new Enemy(lastEnemy, int(random(0, 2))));

      lastSpawn = lastSpawn > 60 ? 0 : 18;

    } else {
      if (lastSpawn > 20 && items.length == 0) {
        items.push(new Item(currentItem));
      }
    }

    background("#faf02d");
    for (let t of enemies) {
      t.move();
      t.show();
      if (t.isOut()) {
        trainOut = true;
      }

      if (t.hits(rider)) {
        gameOver = true;
        setTimeout(function(){ canContinue = true}, 500);
      }
    }

    if (items.length != 0) {
      items[0].move();
      items[0].show();

      if (items[0].isOut()) {
        itemOut = true;
        currentItem = int(random(1,4));
      }

      if (items[0].hits(rider)) {
        itemOut = true;
        completed+= currentItem == 0 ? 1 : 0;
        currentItem = currentItem == 0 ? int(random(1,4)): 0;
      }
    }

    rider.show();
    rider.move();

    strokeWeight(3);
    stroke("#ff5425");
    line(0, height + floor-2, width, height + floor-2)

    if (trainOut) {
      enemies.splice(0, 1);
    }
    if (itemOut) {
      items.splice(0, 1);
    }

    currentFrame += 1 / 6;
    if (currentFrame >= numFrames.rider * numFrames.dron * numFrames.vnta * numFrames.vntb) {
      currentFrame = 0;
    }

    riderImg = frames.rider[int(currentFrame) % numFrames.rider];
    dronImg = frames.dron[int(currentFrame) % numFrames.dron];
    vntaImg = frames.vnta[int(currentFrame) % numFrames.vnta];
    vntbImg = frames.vntb[int(currentFrame) % numFrames.vntb];
    itemImg = itemsFrames[currentItem];
    if(!started){
      started = true;
      gameOver = true;
    }else if(gameOver){
      image(repeatImg, width/2-50, height/2 -50, 100, 100);
    }
  }

  fill("#ff5425");
  for (var i = 0; i < completed; i++) {
    ellipse(riderPos + 50 + i * 20, height +floor/4, 10, 10)
  }

}

function linedash(x1, y1, x2, y2, delta, style = '-') {
  // delta is both the length of a dash, the distance between 2 dots/dashes, and the diameter of a round
  let distance = dist(x1,y1,x2,y2);
  let dashNumber = distance/delta;
  let xDelta = (x2-x1)/dashNumber;
  let yDelta = (y2-y1)/dashNumber;

  for (let i = 0; i < dashNumber; i+= 2) {
    let xi1 = i*xDelta + x1;
    let yi1 = i*yDelta + y1;
    let xi2 = (i+1)*xDelta + x1;
    let yi2 = (i+1)*yDelta + y1;

    if (style == '-') { line(xi1, yi1, xi2, yi2); }
    else if (style == '.') { point(xi1, yi1); }
    else if (style == 'o') { ellipse(xi1, yi1, delta/2); }
  }
}
