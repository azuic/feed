// input & weather
var weather;
var windSpeed;
var windDegree;

var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var apiKey = '&APPID=5f41b3e0d39b7f84a697844ba3c29d64';
var units = '&units=metric';

var input;

// snow
var screenW = window.innerWidth,
    screenH = window.innerHeight;
var ball = undefined;
var diameter = 6;
var maxSnowBalls = 1000;
var GRAVITY = 1;
var balls = [];

// var streetviewAPI = 'https://maps.googleapis.com/maps/api/streetview?size=2500x2500&location='
// var filter = '&fov=90&heading=235&pitch=10&source=outdoor&key=AIzaSyB7Jbzxf8JQev-wBI4XGTypflanUOjgq3Y';
// var bg;

function setup() {
  // createCanvas(0.8*screenW, 2/3*screenH);
  createCanvas(screenW, screenH);

  var button = select('#submit');
  button.mousePressed(weatherAsk);
  input = select('#city');


  // var streetviewUrl = streetviewAPI + input.value() + filter;
  // bg = createImg(streetviewUrl);

  frameRate(40);
  for(var i = 0; i < maxSnowBalls; i++){
    ball = new Ball(
      (Math.random()*screenW),
      (Math.random()*screenH),
      (Math.random()*diameter)
    );
    ball.angle = angle();
    balls.push(ball);
  }
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);


}

function gotData(data) {
  weather = data;
}



function draw() {

  // image(bg,0,0);
  background(0);

  if (weather) {
    windSpeed = weather.wind.speed;
    windDegree = weather.wind.deg;
    fill(100);
    // ellipse(100, 100, temp, temp);
    // ellipse(300, 100, humidity, humidity);
    // text(windSpeed,100,150);
    // text(windDegree,200,150);

    for(var i = 0; i < balls.length; i++){
      balls[i].gravity();
      balls[i].wind();
      isFallen(balls[i], i);
    }

    fill(200, 200, 200);
    for (var i = 0; i < balls.length; i++) {
      balls[i].show();
    }
  }

}

/*----------------------------------- Ball -----------------------------------*/
//Constructor()
/**
 * Ball constructor
 *
 * @param posX {number} the X position in the view
 * @param posY {Number} the Y position in the view
 * @param diameter {Number} Ball diameter
 *
 */
function Ball(posX, posY, dimater){
  this.posX = posX;
  this.posY = posY;
  this.dimaterX = dimater;
  this.dimaterY = dimater;
  this.force = windSpeed;
  this.angle = 0;
  //this.breakLine = screenH / Math.random()*11;
}

Ball.prototype = {

  //show the element
  show: function(){
    ellipse(this.posX, this.posY, this.dimaterX,this.dimaterY);
  },

  //gravity force
  gravity: function(){
    var yForce = (this.force * GRAVITY);
    if (yForce<1){yForce = 1;}

    this.posY += yForce;

    if (this.posY > (screenW/3)) {
      this.dimaterY += .01;
      this.diameterX += this.angle;
      this.force += .02;
    }
  },

  //simulate wind with the angle
  wind: function(){
    this.posX += this.angle;
  }

};

/**
 * Check one by one snowballs are out of the canvas then remove it from the array
 * and create a new snowball
 */
function isFallen(checkBall, arrPos){
  if (
    (checkBall.posY > screenH) ||
    (checkBall.posX > screenW) ||
    (checkBall.posX < 0)
  ) {
    balls.splice(arrPos, 1);
    ball = new Ball(
      (Math.random()*screenW),
      0,
      (Math.random()*diameter)
    );
    if (windDegree/360<0.5){
      ball.angle = -windDegree/360*2*PI;
    } else {
      ball.angle = windDegree/360*2*PI;
    }
    balls.push(ball);
  }
}

/**
 * Assing the falling angle of the snowball
 *
 * @return {Number} angle of falling
 */
function angle(){
  var angle = (Math.random().toFixed(2)*8) /10;
  var isNegative = Math.random().toFixed(1);

  if (isNegative > .5) {
    angle = -angle;
  }

  return angle;
}
