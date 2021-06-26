var dogimg,dog,happydog,database,foods,foodstock;
var feed , addfood;
var fedTime, lastFed;
var foodObj;
var namebox,dogname,button;
var changestate,readstate;
var bedroom,garden,washroom;
var gameState;
var dogi;
function preload()
{
	dogimg = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  livingroom = loadImage("images/Living Room.png");
}

function setup() {
	createCanvas(500,600);
  database = firebase.database();
  foodstock = database.ref('food');
  foodstock.on("value",readStock);
  
  foodObj = new Food();

  //buttons
  feed = createButton("feed the Dog");
  feed.position(400,125);
  if (feed.mousePressed(function(){
    if (foods > 0){foods=foods-1;}
    gameState=1;
    var currentTime = hour();
    database.ref('/').update({
      'hour':currentTime,
      'gameState':gameState
    });
  }))
  var Bath = createButton("I want to take bath");
  Bath.position(580,125);
  if (Bath.mousePressed(function(){
    gameState = 3;
    database.ref('/').update({'gameState' : gameState});
  }));
  var sleep = createButton("I am very sleepy");
  sleep.position(710,125);
  if (sleep.mousePressed(function(){
    gameState = 4;
    database.ref('/').update({'gameState':gameState});
  }));
  var play = createButton("Lets play");
  play.position(500,160);
  if (play.mousePressed(function(){
    gameState = 5;
    database.ref('/').update({'gameState':gameState});
  }));
  var playingarden  = createButton("Lets play in park");
  playingarden.position(585,160);
  if (playingarden.mousePressed(function(){
    gameState = 6;
    database.ref('/').update({'gameState':gameState});
  }));
  addfood = createButton("add Food");
  addfood.position(500,125);
  if(addfood.mousePressed(function(){
    foods+=1;
    gameState=2;
    database.ref('/').update({'gameState':gameState});
   }));

  ///////*Dog*
  dog = createSprite(200,height-height/4,50,50);
  dog.addImage(dogimg);
  dog.scale=0.175;
  
  //reading gamestate 
  readstate=database.ref('gamestate');
  readstate.on("value",(data)=>{
    gameState = data.val()
  })

  dogi =0;
}


function draw() {  
  background(46, 139, 87);
  foodObj.display();
  drawSprites();
  textSize(20);
  fill(255);
  stroke(0);
  text("food remaining :"+foods,50,50);
  database.ref('hour').on("value",function(data){
    lastFed = data.val();
  });
  if (lastFed>12){
    text("last fed : "+ lastFed%12 +"PM",50,30);
  }else if (lastFed === 12){
    text("last fed : 12 AM",50,30);
  }else{
    text("last fed : "+ lastFed+ "AM",50,30);
  }/*
  if (gameState !== 1){
    feed.hide();
    addfood.hide();
    dog.remove();
  }else{
    feed.show();
    addfood.show();
    dog.addImage(dogimg);
    if (dogi === 1){dog.addImage(happydog);}
  }*/
  currentTime = hour();
  if(currentTime===(lastFed+1)){
    update(6);
  } else if (currentTime===(lastFed+2)){
    update(4);
  } else if (currentTime>(lastFed+2)&&currentTime<(lastFed+4)){
    update(3);
  } else{
    update(1);
  }
 
  // game states
  if (gameState === 1){
    dog.addImage(happydog);
    foodObj.milkBottle = true;
    dog.scale=0.175;
    dog.y = height-height/4;
  }
  if (gameState === 2){
    dog.addImage(dogimg);
    dog.scale = 0.175;
    foodObj.milkBottle = false;
    dog.y = height-height/4;
  }
  
  if (gameState === 3){
    dog.addImage(washroom);
    dog.scale= 1;
    foodObj.milkBottle = false;
    dog.x = width/2;
    dog.y = height/2;
  }
  if (gameState === 4){
    dog.addImage(bedroom);
    dog.scale=1;
    foodObj.milkBottle = false;
    dog.x = width/2;
    dog.y = height/2;
  }
  if (gameState === 5){
    dog.addImage(livingroom);
    dog.scale=1;
    foodObj.milkBottle = false;
    dog.x = width/2;
    dog.y = height/2;
  }
  if (gameState === 6){
    dog.addImage(garden);
    dog.scale=1;
    foodObj.milkBottle = false;
    dog.x = width/2;
    dog.y = height/2;
  }
}
// read values from DB
function readStock(data){
  foods = data.val();
}
// write values in DB
function writeStock(x){
  database.ref('/').update({
    food:x
  })
}
//function to feed Dog i.e, remove food
function feedDog(){
  foodObj.updateFoodStock();
  //writeStock(foods);
  dog.addImage(happydog);
  foodObj.fedImg = true;
  dogi = 1;
  gameState = 1;
}
// function to add food 
function addFood(){
  database.ref('/').update({
    food:foods+1
  });
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
