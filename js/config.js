var config = {
  baseUrl: '',
  backgroundColor: 'rgb(200, 200, 200)',
  zoomDistance: {
    init: 150,
    min: 150,
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
  },
  groups: {
    url: '/data/ionic/cards/',
    json: 'floors.json'
  }
};