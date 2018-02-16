export default function takeSelfie() {
  Webcam.snap(function(data_uri) {
    $('.text-box').empty().append(`<div id="my_camera">
    </div>`);
    document.getElementById('my_camera').innerHTML = '<img src="' + data_uri + '"/>';
  });
  Webcam.reset();
}
