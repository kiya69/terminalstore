var Demo = Demo || {};
var mouse2D = new THREE.Vector3(0, 10000, 0.5);
var onDocumentMouseMove = function(mouse2D, event) {
  event.preventDefault();
  var canvas = document.getElementsByTagName('canvas')[0];

  var marginX = (window.innerWidth - canvas.width) / 2;

  // Make sure mouse movement is in container
  if (event.clientX > marginX && event.clientX < window.innerWidth - marginX && event.clientY < canvas.height) {

    // Convert eventX and eventY to mouse2D
    var clientX = event.clientX - marginX;
    var clientY = event.clientY;

    mouse2D.x = (clientX / canvas.width) * 2 - 1;
    mouse2D.y = -(clientY / canvas.height) * 2 + 1;
  }
}
Demo.Scene = function(params) {

  this.container = document.getElementById(params.canvasId);
  this.jqContainer = $('#' + params.canvasId);

  // rays for casting.
  this.rays = [];
  // Cards geometries representing units
  this.cards = [];

  // an array of scene elements we're interested in colliding with.  the X's and O's.
  this.collisions = [];

  this.scene = null;
  this.projector = null;
  this.renderer = null;
  this.setup = null;
  this.camera = null;
  this.controls = null;
  this.init();

};

Demo.Scene.prototype = {

  init: function() {
    var params = {
      context: this
    };

    this.scene = new THREE.Scene();
    this.projector = new THREE.Projector();
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true,
      preserverDrawingBuffer: true
    });

    this.renderer.setClearColor(new THREE.Color(config.backgroundColor), 1.0);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    var aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 100000);
    this.camera.position.z = config.zoomDistance.init;
    // this.setup = new Demo.Scene.Setup(params);
    // this.controls = new THREE.OrbitControls(this.cameras.liveCam, this.container);

    this.listeners();

    this.controls = new THREE.OrbitControls(this.camera, this.container);

    this.mouse2D = new THREE.Vector3(0, 10000, 0.5);
    var that = this;
    this.renderer.domElement.addEventListener('mousemove', function(e) {
      onDocumentMouseMove(that.mouse2D, event)
    }, false);
  },

  listeners: function() {
    var that = this;
    $(window).resize(that.onWindowResize.bind(that));
  },

  onWindowResize: function() {
    var aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  },

  screenshot: function(filename) {
    // alert(filename)
    this.renderer.render(this.scene, this.camera);
    var uri = this.renderer.domElement.toDataURL('image/jpeg');
    console.log(uri)
    var img = uriToBlob(uri);
    img.type = 'image/jpeg';
    saveAs(img, filename);
  },
  onDocumentMouseMove: function(mouse2D, event) {
    event.preventDefault();
    var canvas = document.getElementsByTagName('canvas')[0];

    var marginX = (window.innerWidth - canvas.width) / 2;

    // Make sure mouse movement is in container
    if (event.clientX > marginX && event.clientX < window.innerWidth - marginX && event.clientY < canvas.height) {

      // Convert eventX and eventY to mouse2D
      var clientX = event.clientX - marginX;
      var clientY = event.clientY;

      mouse2D.x = (clientX / canvas.width) * 2 - 1;
      mouse2D.y = -(clientY / canvas.height) * 2 + 1;
    }
  }

};