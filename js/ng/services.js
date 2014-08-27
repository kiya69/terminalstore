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
    demo.controls.update();
  }

  function load(url, mtlurl, options) {
    console.log('loading');
    var loader = new THREE.UTF8Loader();
    loader.load(url, function(object) {
      object.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.emissive.setRGB(1, 1, 1);
          child.rotation.x = -Math.PI / 2;

          if (child.material.name.indexOf('glass') != -1) {
            child.material.transparent = true;
            child.material.renderDepth = -1.1;
            child.material.opacity = 0.2;
          }
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