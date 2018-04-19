// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
var divRoot = $("#affdex_elements")[0];
var width = 0;
var height = 0;
var faceMode = affdex.FaceDetectorMode.LARGE_FACES;
//Construct a CameraDetector and specify the image width / height and face detector mode.
var detector = new affdex.CameraDetector(divRoot, 0, 0, faceMode);
var joy, joyflag = 0;
//Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllEmojis();

//Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener("onInitializeSuccess", function() {
  /*log('#logs', "The detector reports initialized");
  //Display canvas instead of video feed because we want to draw the feature points on it
  $("#face_video_canvas").css("display", "block");
  $("#face_video").css("display", "none");*/
});

function log(node_name, msg) {
  $(node_name).append("<span>" + msg + "</span><br />")
}

//function executes when Start button is pushed.
function onStart() {
  if (detector && !detector.isRunning) {
    detector.display = "none";
    //detector.addEventListener();
    detector.start();
    detector.display = "none";
  }
}

//function executes when the Stop button is pushed.
function onStop() {
  if (detector && detector.isRunning) {
    detector.removeEventListener();
    detector.stop();
  }
};

//function executes when the Reset button is pushed.
function onReset() {
  //log('#logs', "Clicked the reset button");
  if (detector && detector.isRunning) {
    detector.reset();
    //$('#results').html("");
  }
};

//Add a callback to notify when camera access is allowed
detector.addEventListener("onWebcamConnectSuccess", function() {
  log('#logs', "Webcam access allowed");
  console.log("Webcam access allowed");
});

//Add a callback to notify when camera access is denied
detector.addEventListener("onWebcamConnectFailure", function() {
  log('#logs', "webcam denied");
  console.log("Webcam access denied");
});

//Add a callback to notify when detector is stopped
detector.addEventListener("onStopSuccess", function() {
  log('#logs', "The detector reports stopped");
  $("#results").html("");
});

//Add a callback to receive the results from processing an image.
//The faces object contains the list of the faces detected in an image.
//Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener("onImageResultsSuccess", function(faces, image,
  timestamp) {
  $('#results').html("");
  log('#results', "Timestamp: " + timestamp.toFixed(2));
  log('#results', "Number of faces found: " + faces.length);
  if (faces.length > 0) {
    // Gets gender, age, facial features
      joy = faces[0].emotions.joy;
      console.log(joyduration);
      console.log(mehduration);
      $('#joy-bar').attr('aria-valuenow', joy).css('width', joy+'%');
    log('#results', "Expressions: " + JSON.stringify(faces[0].expressions,
      function(key, val) {
        return val.toFixed ? Number(val.toFixed(0)) : val;
      }));

    // Return an emoji of face
    log('#results', "Emoji: " + faces[0].emojis.dominantEmoji);
  }
});

//Draw the detected facial feature points on the image
function drawFeaturePoints(img, featurePoints) {
  var contxt = $('#face_video_canvas')[0].getContext('2d');

  var hRatio = contxt.canvas.width / img.width;
  var vRatio = contxt.canvas.height / img.height;
  var ratio = Math.min(hRatio, vRatio);

  contxt.strokeStyle = "#FFFFFF";
  for (var id in featurePoints) {
    contxt.beginPath();
    contxt.arc(featurePoints[id].x,
      featurePoints[id].y, 2, 0, 2 * Math.PI);
    contxt.stroke();

  }
}

var iFrequency = 5000; // expressed in miliseconds
var myInterval = 0;
var joyduration = 0, mehduration = 0;

var playlists = ["https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500842647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500852178&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500850885&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500848224&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500847177&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500844384&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500844078&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/500842647&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"]

myInterval = window.setInterval( "changePlaylist()", iFrequency );  // run

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function changePlaylist() {
  if (joy < 40) {
    mehduration++;
    if (joyduration > 0) joyduration = 0;
  }
  if (joy > 40) {
    joyduration++;
    if (mehduration > 0) mehduration = 0;
  }
  if (mehduration >= 3) {
    console.log('meh');
    $("#sc").attr("src", playlists[getRandomInt(0,7)]);
    joyduration = 0;
    mehduration = 0;
  }
  if (joyduration >= 3) {
    console.log('user is happy');
    joyduration = 0;
    mehduration = 0;
  }
}

//Mirrors the user
/*affdex_elements.style.cssText = "-moz-transform: scale(-1, 1); \
-webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
transform: scale(-1, 1); filter: FlipH;";*/
