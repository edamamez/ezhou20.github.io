
var iframeElement = document.querySelector('iframe');
var widget1 = SC.Widget(iframeElement);

$(document).ready(function() {
  widget1.seekTo(20000);
});

console.log(iframeElement);
function refreshIframe(src) {
  console.log('executing refresh');
  widget1.next();
  widget1.seekTo(20000);
  $("#sc").attr("src", "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500842647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true");
}
