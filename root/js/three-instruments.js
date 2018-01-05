// MAIN

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var violin;
var viola;
var cello;
var piano;
var CurrentMaterial;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersected;

init();
animate();

// FUNCTIONS
function init()
{
    // SCENE
    scene = new THREE.Scene();
    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    scene.add(camera);
    camera.position.set(0,0,-200);
    camera.lookAt(scene.position);
    // RENDERER
    if ( Detector.webgl )
        renderer = new THREE.WebGLRenderer( { antialias:true, alpha: true } );
    else
        renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container = document.getElementById( 'ThreeInstruments' );
    container.appendChild( renderer.domElement );
    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
    // CONTROLS
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enabled = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.maxPolarAngle = Math.PI - Math.acos(39.9929/200);
    controls.minPolarAngle = 1/9 * Math.PI;
    // LIGHT
    var light1 = new THREE.PointLight(0xffffff,4);
    light1.position.set(22.703,48.3787,83.9535);
    scene.add(light1);
    var light2 = new THREE.PointLight(0xffffff,1);
    light2.position.set(-44.1099,48.3787,-51.862);
    scene.add(light2);
    var light3 = new THREE.PointLight(0xffffff,1);
    light3.position.set(88.0925,17.0263,47.4175);
    scene.add(light3);
    var light4 = new THREE.PointLight(0xffffff,1);
    light4.position.set(0,150,0);
    light4.castShadow = true;
    scene.add(light4);
    var light5 = new THREE.PointLight(0xffffff,4);
    light5.position.set(22.703,48.3787,-83.9535);
    scene.add(light5);
    //FLOOR
    var floorMaterial = new THREE.ShadowMaterial({ side: THREE.DoubleSide });
    floorMaterial.opacity = 0.1;
    //var floorMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    var floorGeometry = new THREE.PlaneGeometry(500, 500, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -39.9929;
    floor.receiveShadow = true;
    scene.add(floor);
    ////////////
    // CUSTOM //
    ////////////
    
    var violinLoader = new THREE.JSONLoader();
    violinLoader.load( "models/violin.js", addViolinToScene );
    
    var violaLoader = new THREE.JSONLoader();
    violaLoader.load( "models/viola.js", addViolaToScene );
    
    var celloLoader = new THREE.JSONLoader();
    celloLoader.load( "models/cello.js", addCelloToScene );
  
    var bassLoader = new THREE.JSONLoader();
    bassLoader.load( "models/bass.js", addBassToScene );
  
    var pianoLoader = new THREE.JSONLoader();
    pianoLoader.load( "models/piano.js", addPianoToScene );
    // when the mouse moves, call the given function
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
}

function addViolinToScene( geometry, materials )
{
    var violinMaterial = new THREE.MeshFaceMaterial( materials );
    violin = new THREE.Mesh( geometry, violinMaterial );
    violin.position.set(-50.9649,0,-20.2596+4.218475);
    violin.rotation.set(0,Math.PI,0)
    violin.scale.set(1,1,1);
    violin.castShadow = true;
    violin.userData = { URL: "violin/"};
    scene.add( violin );
}

function addViolaToScene( geometry, materials )
{
    var violaMaterial = new THREE.MeshFaceMaterial( materials );
    viola = new THREE.Mesh( geometry, violaMaterial );
    viola.position.set(-31.5739,0,-20.2596+4.218475);
    viola.rotation.set(0,Math.PI,0);
    viola.scale.set(1,1,1);
    viola.castShadow = true;
    viola.userData = { URL: "viola/"};
    scene.add( viola );
}

function addCelloToScene( geometry, materials )
{
    var celloMaterial = new THREE.MeshFaceMaterial( materials );
    cello = new THREE.Mesh( geometry, celloMaterial );
    cello.position.set(-4.50507,0,-20.2596+4.218475);
    cello.rotation.set(0,Math.PI,0);
    cello.scale.set(1,1,1);
    cello.castShadow = true;
    cello.userData = { URL: "cello/"};
    scene.add( cello );
}

function addBassToScene( geometry, materials )
{
  var bassMaterial = new THREE.MeshFaceMaterial( materials );
  bass = new THREE.Mesh( geometry, bassMaterial );
  bass.position.set(36.2411,-2.54195,-20.2596+4.218475);
  bass.rotation.set(0,Math.PI,0);
  bass.scale.set(1,1,1);
  bass.castShadow = true;
  bass.userData = { URL: "bass/"};
  scene.add( bass );
}

function addPianoToScene( geometry, materials )
{
    var pianoMaterial = new THREE.MeshFaceMaterial( materials );
    piano = new THREE.Mesh( geometry, pianoMaterial );
    piano.position.set(0,-6.89087,9.53965+4.218475);
    piano.scale.set(1,1,1);
    piano.castShadow = true;
    piano.userData = { URL: "piano/"};
    scene.add( piano );
}

function onDocumentMouseMove( event )
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    event.preventDefault();
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY + window.scrollY) / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );
    
    var intersections = raycaster.intersectObjects( scene.children.slice(7) );
    
    if ( intersections.length > 0 )
    {
        // if the closest object intersected is not the currently stored intersection object
        if ( intersected != intersections[ 0 ].object )
        {
            // restore previous intersection object (if it exists) to its original color
            if ( intersected )
            {
                intersected.material = CurrentMaterial;
            }
            // store reference to closest object as current intersection object
            intersected = intersections[ 0 ].object;
            // store color of closest object (for later restoration)
            CurrentMaterial = intersected.material;
            // set a new color for closest object
            var SelectMaterial = new THREE.MeshLambertMaterial( { color: 0x082f3a } );
            intersected.material = SelectMaterial;
            
            /*var tween = TweenMax.to(intersections[ 0 ].object.position, 0.5, { ease:Linear.easeNone, y:5, yoyo:true, repeat:1 });
             if(!tween.isActive()){
             TweenMax.to(intersections[ 0 ].object.position, 0.5, { ease:Linear.easeNone, y:5, yoyo:true, repeat:1 });*/
        }
    }
    else // there are no intersections
    {
        // restore previous intersection object (if it exists) to its original color
        if ( intersected )
        {
            intersected.material = CurrentMaterial;
        }
        // remove previous intersection object reference
        //     by setting current intersection object to "nothing"
        intersected = null;
    }
}

function onDocumentMouseDown( event )
{
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
    event.preventDefault();
    
    // update the mouse variable
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( ( event.clientY + window.scrollY) / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );
    
    var intersections = raycaster.intersectObjects( scene.children.slice(7) );
    
    if ( intersections.length > 0 )
    {
        window.open(intersections[0].object.userData.URL, "_self");
    }
}

var ticking = false;

window.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function () {
            var scrollRange = 4;
            camera.position.y = window.scrollY / scrollRange;
            ticking = false;
        });
    }
    ticking = true;
});

function animate()
{
    requestAnimationFrame( animate );
    render();
}

function render() 
{
    controls.update();
    renderer.render( scene, camera );
}