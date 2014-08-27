'use strict';

app.factory('three', function($http, $log, $rootScope) {

  var demo;
  var canvas = document.getElementById('main');

  function init(params) {
    demo = new Demo.Scene(params);
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    render();
  }

  function render() {
    demo.renderer.render(demo.scene, demo.camera);
  }

  function load(url, mtlurl, options) {
    console.log('loading');
    var loader = new THREE.OBJMTLLoader();
    loader.load(url, mtlurl, function(object) {
      console.log(object);
      // demo.scene.add(object);
    });
  }

  return {
    init: init,
    load: load
  };
});