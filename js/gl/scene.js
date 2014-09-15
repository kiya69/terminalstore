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

function onMouseUp(scope, event) {
  // clickTime = Date.now() - clickTime;

  var intersects = getIntersects(scope.camera, scope.mouse2D.clone(), scope.scene.children);

  if (intersects.length > 0) {
    //centerBuilding(intersectedObject);
    console.log(intersects[0].object.name);
    scope.addCardToUrl(intersects[0].object.name);
    // var object = scope.scene.getObjectByName(intersects[0].object.name);
    // object.visible = !object.visible;
  }
  // else {
  //   var infoDiv = document.getElementsByTagName('unitInfo')[0];
  //   infoDiv.style.visibility = "hidden";
  // }
}

function showInfo() {
  var cards = window.location.hash.substring(1).split(';');
  var infoDiv = document.getElementsByTagName('unitInfo')[0];
  infoDiv.style.visibility = "visible";
  // TODO if it's the second click on the card, should delete/minus it or just show info based on url?
  var total = 0;
  var html = "";
  for (var i = 1, pickedCardsLen = cards.length; i < pickedCardsLen; i++) {
    var card;
    for (var j = 0, totalLen = config.cards.info.length; j < totalLen; j++) {
      if (config.cards.data[j] == cards[i]) {
        card = config.cards.info[j];
        total += config.cards.info[j].size;
        html += "Unit: " + cards[i] + "</br>Size: " + parseInt(card.size).formatComma() + "</br>Availability: " + card.availability + "</br></br>";
      }
    }

  }
  // total += config.cards.info[idx].size
  var totalHTML = "Total: " + parseInt(total).formatComma() + " sf";
  // html += "Unit: " + card + "</br>Size:" + config.cards.info[idx].size + "</br>Availability: " + config.cards.info[idx].availability + "</br></br>";
  infoDiv.innerHTML = html + totalHTML;
  // var totalDiv = document.createElement('total');

  // totalDiv.innerHTML = 
  // infoDiv.appendChild(totalDiv);
}

function getIntersects(camera, mouse, children) {
  var projector = new THREE.Projector();
  var raycasters = projector.pickingRay(mouse, camera);
  //TODO: should move to scene
  return (raycasters.intersectObjects(children));
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
    this.renderer.domElement.addEventListener('mouseup', function(e) {
      onMouseUp(that, event)
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
  checkPicker: function() { //TODO: should move to scene
    var intersects = getIntersects(this.camera, this.mouse2D.clone(), this.scene.children);
    var infoDiv = document.getElementsByTagName('unitInfo')[0];
    var hovered = false;
    var cards = window.location.hash.substring(1).split(';');
    // if (infoDiv.style.visibility == "visible") return;
    for (var each in this.scene.children) {
      if (this.scene.children[each].name !== "" && cards.indexOf(this.scene.children[each].name) == -1) this.scene.children[each].visible = false;
      // else if (window.location.hash.indexOf(demo.scene.children[each].name) > -1) demo.scene.children[each].visible = true;
      if (intersects && intersects.length > 0) {
        var object = this.scene.getObjectByName(intersects[0].object.name);
        object.visible = true;
      }
    }
  },
  addCardToUrl: function(card) {
    var hash = window.location.hash.substring(1);

    var cards = hash.split(';')
    var index = cards.indexOf(card);

    if (index > -1) {
      cards.splice(index, 1);
    } else {
      cards.push(card);
    }

    window.location.hash = cards.join(';');
    showInfo();
  },
  showInfo: showInfo
};