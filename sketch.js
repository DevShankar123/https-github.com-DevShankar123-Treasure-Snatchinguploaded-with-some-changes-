var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var cashG, diamondsG, jwelleryG, swordGroup;
//game states
var play = 1;
var end = 0;
var gamestate = play;
var treasurecollection = 0;
var reset;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png", "runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {

  createCanvas(400, 600);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);



  //creating boy running
  boy = createSprite(70, 530, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.addAnimation("end", endImg);
  boy.scale = 0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

}

function draw() {



  if (gamestate === play) {
    path.velocityY = 4;
    boy.x = World.mouseX;
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    boy.changeAnimation("SahilRunning", boyImg);


  }

  background(0);

  edges = createEdgeSprites();
  boy.collide(edges);

  //code to reset the background
  if (path.y > 400) {
    path.y = height / 2;
  }




  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasurecollection = treasurecollection + 50;
  } else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasurecollection = treasurecollection + 150;

  } else if (jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasurecollection = treasurecollection + 100;

  } else {
    if (swordGroup.isTouching(boy)) {
      swordGroup.destroyEach();
      gamestate = end;
    }
  }
  if (gamestate === end) {

    boy.changeAnimation("end", endImg);
    boy.scale = 0.7;
    boy.x = 200;
    boy.y = 300;
    boy.velocityX = 0;
    path.velocityX = 0;
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    if (keyDown("space")) {
      reset();
    }




  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasurecollection, 150, 30);
  if (gamestate === end) {
    text("PRESS THE SPACE KEY TO START AGAIN", 6, 350);
  }

}

function createCash() {
  if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;

    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;

    diamonds.velocityY = 3;

    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;

    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;


    sword.lifetime = 150;
    swordGroup.add(sword);
  }
}

function reset() {
  gamestate = play;
  treasurecollection = 0;
  boy.x = 70;
  boy.y = 530;
  boy.scale = 0.08;


}