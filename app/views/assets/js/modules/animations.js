var cat = document.querySelector('.cat');
var main = document.querySelector('main');
var text = document.querySelector('.text-box');

var crtIndex = 0;
var crtPartyIndex = 0;
var crtPartyIndex2 = 0;
var timer;
var timer2;

var images = [
  'assets/images/cat/a.png',
  'assets/images/cat/b.png',
  'assets/images/cat/a.png',
  'assets/images/cat/d.png',
  'assets/images/cat/e.png',
  'assets/images/cat/f.png'
];

var partyImages = [
  'assets/images/cat/1.1.png',
  'assets/images/cat/2.1.png',
  'assets/images/cat/3.1.png'
];

var partyImages2 = [
  'assets/images/cat/1.2.png',
  'assets/images/cat/2.2.png',
  'assets/images/cat/3.2.png'
];

var imageElems = new Array()

function preload(images) {
  for (i = 0; i < images.length; i++) {
    imageElems[i] = new Image()
    imageElems[i].src = images[i]
  }
}

function setCatImage() {
  if (crtIndex + 1 === images.length) {
    crtIndex = 0;
  } else {
    crtIndex++;
  }

  cat.style.backgroundImage = 'url(' + images[crtIndex] + ')';
}

function setCatPartyImage() {
  if (crtPartyIndex + 1 === partyImages.length) {
    crtPartyIndex = 0;
  } else {
    crtPartyIndex++;
  }

  cat.style.backgroundImage = 'url(' + partyImages[crtPartyIndex] + ')';
}

function setCatPartyImage2() {
  if (crtPartyIndex2 + 1 === partyImages2.length) {
    crtPartyIndex2 = 0;
  } else {
    crtPartyIndex2++;
  }

  main.style.backgroundImage = 'url(' + partyImages2[crtPartyIndex2] + ')';
}

function makeCatSpeak() {
  makeCatStopParty();
  timer = setInterval(setCatImage, 400);
}

function makeCatStop() {
  clearInterval(timer);
}

function makeCatParty() {
  makeCatStop();
  timer = setInterval(setCatPartyImage, 400);
  timer2 = setInterval(setCatPartyImage2, 400);
  text.style.visibility = 'hidden';
}

function makeCatStopParty() {
  clearInterval(timer);
  clearInterval(timer2);
  text.style.visibility = 'visible';
}

preload(images)
preload(partyImages)
preload(partyImages2)
