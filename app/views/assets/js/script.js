import speech from './modules/voiceSynthesizer.js';
import jokes from './modules/jokes.js';
import selfie from './modules/takeSelfie.js';
import initMap from './modules/googleMaps.js';
import fetchWeather from './modules/weatherAPI.js';

$(() => {
  let name;
  const audio = document.getElementById('myAudio');
  let stopParty = () => {
    makeCatStopParty();
    audio.pause();
    speech();
    speech();
    speech(`I was having so much fun! ${name}`);
    $('.text-box, .inputBox').show();
  }
  // what our cat will say
  speech('Hi, im a little cat');
  speech('whats your name?');
  // Speech recognition
  try {
    var recognition = new webkitSpeechRecognition();
  } catch (e) {
    var recognition = Object;
  }
  // languaje we going to use
  recognition.lang = 'en-US';
  // mic on untill we decide to stop it
  recognition.continuous = true;
  // dont show the text while we speaking, just wen we stop the mic
  recognition.interimResults = false;
  recognition.onresult = (event) => {
    var txtRec = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      txtRec += event.results[i][0].transcript;
    }
    // print what we say
    $('#txtArea').val(txtRec);

    // checking our text and decide what to do with keywords
    if (txtRec.match('weather')) {
      let city = txtRec.split(' ');
      city = city[city.length - 1];
      fetchWeather(city);
    } else if (txtRec.match('name')) {
      name = txtRec.split(' ');
      name = name[name.length - 1];
      speech(`Hello, ${name}, how can i help you?`);
    } else if (txtRec.match('joke')) {
      let rndNum = Math.floor(Math.random() * jokes.length);
      speech(`${jokes[rndNum].joke}`);
    } else if (txtRec.match('where')) {
      $('.text-box').empty();
      // data from our pc that say where we are conected
      navigator.geolocation.getCurrentPosition(position => {
        // start the google maps API with the lat and long provide by 'getCurrentPosition'
        initMap(position.coords.latitude, position.coords.longitude, 17);
      });
    } else if (txtRec.match('selfie')) {
      $('.text-box').empty().append('<div id="my_camera"></div>');
      Webcam.attach('#my_camera');
    } else if (txtRec.match('click')) {
      $('#my_camera').empty();
      selfie();
    } else if (txtRec.match('party')) {
      speech('Lets party!');
      $('.text-box, .inputBox').hide();
      makeCatParty();
      audio.play();
    } else if (txtRec.match('stop')) {
      stopParty();
    } else if (txtRec.match('thank')) {
      speech(`Youre welcome ${name}`);
    } else {
      speech('Can you repeat please?');
    }
  };

  $('#startRecognition').click(() => {
    $('#txtArea').focus();
    recognition.start();
  });
  $('#stopRecognition').click(() => {
    recognition.stop();
  });
  $('#pause').click(() => {
    stopParty();
  });
});
