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

  function parseFileFromUrl(url) {
    return url.split('/').slice(-1)[0].split('.')[0];
  }

  function loadCards(url, callback) {
    var loader = new THREE.OBJLoader();
    $.getJSON(url, function(data) {

      callback(data.map(function(curr, i, a) {
        return parseFileFromUrl(curr.url);
      }));

      var cards = window.location.hash.substring(1).split(';');

      for (var i = 0; i < data.length; i++) {
        loader.load(config.baseUrl + data[i].url, (function(url) {
          return function(object) {
            object = object.children[0];
            object.material.emissive.setRGB(0, 0, 5);
            object.material.transparent = true;
            object.material.renderDepth = -1.1;
            object.material.opacity = 0.4;

            object.rotation.x = -Math.PI / 2;

            object.material.side = THREE.DoubleSide;

            object.name = parseFileFromUrl(url);
            object.visible = cards.indexOf(object.name) > -1;

            demo.cards.push(object);
            demo.scene.add(object);
          }
        })(data[i].url))
      }
    });
  }

  function screenshot(filename) {
    demo.screenshot(filename);
  }

  function onCardClick(url) {
    var object = demo.scene.getObjectByName(url);
    object.visible = !object.visible;
  }

  return {
    init: init,
    load: load,
    loadCards: loadCards,
    screenshot: screenshot,
    onCardClick: onCardClick
  };
});