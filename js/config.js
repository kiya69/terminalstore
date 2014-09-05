var config = {
  baseUrl: '',
  backgroundColor: 'rgb(200, 200, 200)',
  zoomDistance: {
    init: 250,
    min: 200,
    max: 300
  },
  orbitAngle: {
    min: 0,
    max: Math.PI / 2
  },
  model: {
    url: '/data/ionic/model.js'
  },
  progress: {
    current: 0
  },
  cards: {
    url: '/data/ionic/cards/',
    json: 'cards.json'
  }
};