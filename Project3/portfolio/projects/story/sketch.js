var imgs = new Array(13); // global var for images, used in moveImg()
var easing = new Array(13); // adjust img x position
var transp = new Array(13); // make img disapper smoothly
var imgxpos = new Array(13); // img x position
var threshold = new Array(13); // help adjust img x position to display 5 imgs

var theFont; // global var for text, used in showText()
var charSizes = []; // size of each char of text
var textPositions = []; // vertical position of text
var currentWeather = '     '; // 5 backspace to hold "rainy", "sunny" or "snowy"
var grn, yel, wht; // background color for text

var alp = 0; // transparency, used in showImg()
var rate = 0; // help adjust alp value for rect above img
var imgW = 375; // width of img, used in moveImg()
var timer = 1000; // help last img disapper smoothly, used in moveImg()

var rainy = false; // buttons to swift among three weather condition
var sunny = false;
var snowy = false;

function preload() {
  theFont = loadFont('data/font1.otf');
  for (var i = 0; i < imgs.length; i++) {
    imgs[i] = loadImage("data/" + i + ".jpg");
    // indice note: 01 start, 23456 rainy, 7891011 sunny, 12 snowy
  }
}

function setup() {
  createCanvas(725, 667);
  background(0);

  noStroke();
  textFont(theFont);
  grn = color(100, 200, 100, 150); // green
  yel = color(255, 255, 100); // yellow
  wht = color(255); // white

  initialize(); // see bottom
}

function draw() {
  opening(); // imgs[0] appears
  showImg(1, 1); // show imgs[1]
  if (rainy) { // type 'r'
    moveImg(2, 6); // imgs[2]-[5] appear gradually
    if (mouseIsPressed) { 
      showText(grn, 'rainy'); // text 'rainy' appears
    }
  }

  if (sunny) { // type 's'
    moveImg(7, 11); // imgs[7]-[11] appear gradually
    if (mouseIsPressed) { 
      showText(yel, 'sunny'); // text 'sunny' appears
    }
  }

  if (snowy) { // type 'w'
    showImg(12, -2); // imgs[12] appears
    if (mouseIsPressed) {
      showText(wht, 'snowy'); // text 'snowy' appears
    }
  }
}

function keyTyped() {
  if (key === 'r') { // type 'r', only rainy is true
    rainy = true;
    sunny = false;
    snowy = false;
  }
  if (key === 's') { // type 's', only sunny is true
    sunny = true;
    rainy = false;
    snowy = false;
  }
  if (key === 'w') { // type 'w', only snowy is true
    snowy = true;
    rainy = false;
    sunny = false;
  }
}

function showImg(idx, rate) {
  image(imgs[idx], 300, 0); // show imgs[idx]
  fill(0, alp);
  rectMode(CORNER);
  rect(300, 0, width, height); // draw a black rect above img
 
  alp += rate; // change alpha value to make the rect cover/uncover img
  if (alp > 300) {
    alp = 300;
  }  
}

function moveImg(src, dst) {
  for (var i = src; i < dst + 1; i++) {
    image(imgs[i], imgxpos[i], 0);

    if ((mouseX > 675) && (mouseX < width) && (mouseY > 615)) { // stop the movement if mouse on right bottom
      imgxpos[i] -= 0;
    } else { // move images to left gradually
      imgxpos[i] -= easing[i];
    }

    if (imgxpos[i] < 249) { // stop movement if images reach the right edge of imgs[0]
      easing[i] = 0;
      fill(0, transp[i]); // draw a back rect to make the image disapper gragually
      rectMode(CORNERS);
      rect(imgxpos[i], 0, width, height);
      transp[i] += 1;

      if (imgxpos[dst] < 249) { // last img reach the right edge of imgs[0]
        timer--; // for gradual effect 
        if (timer < 0) {
          for (var j = src; j < dst + 1; j++) {
            image(imgs[j], imgxpos[j] + threshold[j], 0);
          }
        } // if timer < 0, display 5 imgs again
      } // if 5th img stop, decrease timer
    } // if img reaches x = 300, stop and disappear
  } // for each img passed in to the function, display them
} // function ends

function showText(color, word) {
  rectMode(CORNER);
  fill(0);
  rect(0, 445, 248, 222); // draw a black rect as background
  fill(color);
  rect(0, 445, 248, 222); // draw a rect under img0

  var charPositions = 35; // position of first char
  currentWeather = word;

  for (var i = 0; i < currentWeather.length; i++) {
    fill(200);
    textSize(charSizes[i]);
    text(currentWeather.charAt(i), charPositions, textPositions[i]);
    charPositions += textWidth(currentWeather.charAt(i));
    textPositions[i] += random(0.5, 1.5);

    if (textPositions[i] > (height + 50)) { // restart showText() if text falls off the window
      textPositions[i] = 520;
      charSizes[i] = random(60, 75);
    }
  }
}

function opening() { // the title of the story
  var i = 0;
  var w = 10;
  var x = floor(random(imgs[i].width)); // random x within imgs[0].width
  var y = floor(random(imgs[i].height));

  imgs[i].loadPixels(); // load pixels of the imgs[0]
  var loc = (x + y * imgs[i].width) * 4; // access location of each pixel
  var r = imgs[i].pixels[loc]; // access r, g, b of each pixel
  var g = imgs[i].pixels[loc + 1];
  var b = imgs[i].pixels[loc + 2];

  fill(r, g, b, 100);
  ellipse(x, y, w, w); // draw point pixels
}

function initialize() {
  for (var i = 2; i < imgxpos.length - 1; i++) { // initialize changing var for imgs[2] -- [11]
    if (i < 7) { // [2]-[6] for rainy
      imgxpos[i] = width + (i - 2) * (imgW + 50); // initial position for each image
      threshold[i] = (i - 2) * 95; // displacement for final 5-img display 
    } else { // [7] - [11] for sunny
      imgxpos[i] = width + (i - 7) * (imgW + 50);
      threshold[i] = (i - 7) * 95;
    }
    easing[i] = 1.5;
    transp[i] = 0;
  }

  textPositions = new Array(currentWeather.length); // initialize changing var for text
  charSizes = new Array(currentWeather.length);
  for (var j = 0; j < currentWeather.length; j++) { // for each char of text, set vertical position and size
    textPositions[j] = 520;
    charSizes[j] = random(60, 75);
  }
}