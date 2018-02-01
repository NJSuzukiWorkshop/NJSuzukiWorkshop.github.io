var body = document.body;
var container = document.getElementById( 'ThreeInstruments' );

// Prepare to load the WebGL scene.
var sceneJS = document.createElement("script");
sceneJS.type = "text/javascript";
sceneJS.src = "js/three-instruments.js";

// Check for WebGL (from http://www.studyjs.com/webgl/webglcontext.html )
var webgl = null;
var canvas = document.createElement('canvas');
var webglContextParams = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
var webglContext = null;
for (var index = 0; index < webglContextParams.length; index++) {
  try {
    webglContext = canvas.getContext(webglContextParams[index]);
    if (webglContext) {
      //breaking as it got context
      break;
    }
  } catch (E) {
    console.log(E);
  }
}
if (webglContext === null || window.matchMedia('(prefers-reduced-motion)').matches) {
  // No WebGL available, or the user wants reduced motion, so don't load the 3d scene.
  webgl = false;
  document.body.dataset.mobile = true;
  container.dataset.loaded = "never";
} else {
  // WebGL is available, go ahead and load the scene!
  webgl = true;
  body.appendChild(sceneJS);
  
  if (/Mobi/.test(navigator.userAgent)) {
    // Full size scene on mobile
    document.body.dataset.webgl = "high";
  }
}