// create a voice Synthesis of whatever we set in 'text'
export default function spech(text) {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(text);
  // Find the voice you want
  const voices = synth.getVoices();
  const voice = voices
    .find(voice => voice.name === 'Fiona');
  // Use the selected voice
  utterThis.voice = voice;
  // Change the pitch and pace
  utterThis.pitch = 1.3;
  utterThis.rate = 1;
  // the cat speak 
  synth.speak(utterThis);
  // the cat moves while speak
  makeCatSpeak();
  // triger this when the cat stop speaking
  utterThis.onend = (event)=> {
    makeCatStop();
  }
  // shows what the cat its saying in our text-box
  $('.text-box').empty().append(`<h2 class="text-sound">${text}</h2>`);
}
