var Demo = Demo || {};

Demo.Scene = function(params) {

  this.container = document.getElementById(params.canvasId);
  this.jqContainer = $('#' + params.canvasId);

  // rays for casting.
  this.rays = [];
  // arrows visualizing vectors
  this.arrows = [];

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

    var aspect = this.jqContainer.width() / this.jqContainer.height();
    this.camera = new THREE.PerspectiveCamera(60, aspect, 1, 100000);
    // this.setup = new Demo.Scene.Setup(params);
    // this.cameras = new Demo.Scene.Cameras(params);
    // this.controls = new THREE.OrbitControls(this.cameras.liveCam, this.container);

    this.listeners();
  },
  listeners: function() {
    var that = this;
    window.addEventListener('resize', that.onWindowResize, false);
  },

  /**
   * Resizes the camera when document is resized.
   * @return {[type]}
   */
  onWindowResize: function() {
    // this.liveCam.aspect = this.jqContainer.width() / this.jqContainer.height();
    // this.liveCam.updateProjectionMatrix();
    this.renderer.setSize(this.jqContainer.width(), this.jqContainer.height());
  },

};