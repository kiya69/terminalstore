'use strict';

app.controller('controller', function($scope, three) {
  var params = {
    canvasId: 'main'
  };
  three.init(params);
  NProgress.start();

  radio('progress').subscribe(function(url, size) {
    config.progress.current += size;
    var pct = config.progress.current / config.progress.total;
    NProgress.set(pct);
    if (pct >= 1) {
      NProgress.done();
      var loading = document.getElementsByTagName('loading')[0];
      loading.id = 'loading-close';

      // This is straight up ghetto
      setTimeout(function() {
        $('loading').remove();
      }, 500);
    }
  });

  radio('progress.total').subscribe(function(size) {
    config.progress.total = size;
  });

  three.load(config.baseUrl + config.model.url);

  three.loadCards(config.baseUrl + config.cards.url + config.cards.json, function(x) {
    $scope.$apply(function() {
      $scope.data = x;
      config.cards.data = x;
    });
  });
  three.loadGroups(config.baseUrl + config.groups.url + config.groups.json, function(groups) {
    $scope.$apply(function() {
      $scope.groups = groups;
      config.groups = groups;
    });

  });
  $scope.onCardClick = function(card, fromText) {
    three.onCardClick(card);
    if (fromText) card.selected = !card.selected;

  };
  var clickTime;
  $scope.onCanvasMouseDown = function() {
    clickTime = Date.now();
  };
  $scope.onCanvasMouseUp = function() {
    console.log(Date.now() - clickTime);
    if(Date.now() - clickTime > 150) return;
    var cardName = three.onMouseUp();
    for (var i in $scope.data)
      if ($scope.data[i].name == cardName)
        $scope.data[i].selected = !$scope.data[i].selected;
      // three.addHashToUrl(card);

  };
  $scope.filterGroups = function(group, card) {
    if (card.indexOf(group) > -1)
      return card;
  };
  $scope.sign = '+ ';
  $scope.showSign = function(showCard) {
    if (showCard) return '- ';
    else return '+ ';
  };

});

// tttApp.controller('TTTController', function ($scope, ThreeEnv) {

//   $scope.dims = 4;

//   $scope.usercolor = "#0000FF";
//   $scope.username = "Player1";
//   $scope.userfirst = false;

//   var canvasId = "ttt-canvas";

//   $scope.startGame = function() {

//     var height = $('#ray-intersection').height(),
//       width = $('#ray-intersection').width();

//     $('#what').fadeOut();
//     $('#ttt-canvas').height(height);
//     $('#ttt-canvas').width(width);
//     $('#ray-intersection').fadeIn();


//     // notice the use of 'this'.  this refers to the controller $scope when this function is called
//     // in normal JS callbacks you'd reference the values with 'var me = this'.  then reference 'me' in the callback function.
//     var params = {
//             dims: this.dims,
//             userColor: this.usercolor,
//             userName: this.username,
//             userFirst: this.userfirst,
//             canvasId: canvasId
//           };

//     ThreeEnv.init(params);

//     $.event.trigger({
//       type: "nextTurn",
//     });

//   };

//   //////////////////////////////////////////////////////////
//   ///
//   /// Access the THREE.js scene through the following API functions.
//   ///
//   /// You may also want to use this approach for the following types of 3D scene interactions:
//   ///    - mouse interaction.
//   ///    - toggle environment settings (rotation)
//   ///    - CRUD operations relating to ng-scoped variables.
//   ///
//   //////////////////////////////////////////////////////////
//   ///  Not sure if creating the following as directives would have been
//   ///  a better option.  Needs more research.
//   //////////////////////////////////////////////////////////


//   $scope.toggleWireframes = function () {
//     ThreeEnv.toggle("wireframes");
//   };

//   $scope.toggleArrows = function () {
//     ThreeEnv.toggle("arrows");
//   };

//   $scope.toggleRotate = function () {
//     ThreeEnv.toggle("rotate");
//   };


// });