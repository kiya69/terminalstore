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
    var loader = new THREE.UTF8Loader();
    loader.load(url, function(object) {
      console.log(object);
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.emissive.setRGB(1, 1, 1);
        }
      });

      demo.scene.add(object);
    });
  }

  return {
    init: init,
    load: load
  };
});