var Demo = Demo || {};

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
      antialias: true
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
  }

};