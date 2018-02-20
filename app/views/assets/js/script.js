import speech from './modules/voiceSynthesizer.js';
import jokes from './modules/jokes.js';
import selfie from './modules/takeSelfie.js';
import initMap from './modules/googleMaps.js';
import fetchWeather from './modules/weatherAPI.js';
import checkWord from './modules/dictionaryAPI.js';

$(() => {
  let name;
  const audio = document.getElementById('myAudio');
  let stopParty = () => {
    makeCatStopParty();
    audio.pause();
    speech();
    speech();
    if (name === undefined) {
      speech("I was having so much fun! ");
    } else {
      speech(`I was having so much fun! ${name}`);
    }

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
  // language we going to use
  recognition.lang = 'en-US';
  // mic on until we decide to stop it
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
    if (txtRec.includes('weather')) {
      let city = txtRec.split(' ');
      city = city[city.length - 1];
      fetchWeather(city);
    }
    else if (txtRec.includes('name')) {
      name = txtRec.split(' ');
      name = name[name.length - 1];
      speech(`Hello, ${name}, how can i help you?`);
    }
    else if (txtRec.includes('joke')) {
      let rndNum = Math.floor(Math.random() * jokes.length);
      speech(`${jokes[rndNum].joke}`);
    }
    else if (txtRec.includes('where am I')) {
      speech("It seems to be that you are here");
      $('.text-box').empty();
      // data from our pc that say where we are connected
      navigator.geolocation.getCurrentPosition(position => {
        // start the google maps API with the lat and long provide by 'getCurrentPosition'
        initMap(position.coords.latitude, position.coords.longitude, 17);
      });
    }
    else if (txtRec.includes('where are you')) {
      speech("It seems to be that i am here");
      $('.text-box').empty();
      // data from our pc that say where we are connected
      navigator.geolocation.getCurrentPosition(position => {
        // start the google maps API with the lat and long provide by 'getCurrentPosition'
        initMap(position.coords.latitude, position.coords.longitude, 17);
      });
    }
    else if (txtRec.includes('selfie')) {
      $('.text-box').empty().append('<div id="my_camera"></div>');
      Webcam.attach('#my_camera');
    }
    else if (txtRec.includes('click')) {
      $('#my_camera').empty();
      selfie();
    }
    else if (txtRec.includes('meaning of')) {
      let word = txtRec.split(' ');
      word = word[word.length - 1];
      checkWord(word);
    }
    else if (txtRec.includes('party')) {
      speech('Lets party!');
      let button = document.getElementById('pause');
      button.style.display = 'block';
      $('.text-box, .inputBox').hide();
      makeCatParty();
      audio.play();
    }
    else if (txtRec.includes('stop')) {
      stopParty();
    }
    else if (txtRec.includes('thank you') || txtRec.includes('thanks')) {
      if (name === undefined) {
        speech(`You're welcome,   but you forgot to tell me your name`);
      } else {
        speech(`You're welcome ${name}`);
      }

    }
    else {
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
