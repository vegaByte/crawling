const { Crawler } = require('./models/Crawler')
const { FireStore } = require('./models/Firestore')
const reservamosConf = require('./sites/reservamos').conf

const defaultTrip = {
  origin: 'monterrey',
  destination: 'ciudad-de-mexico',
  date: '30-nov-19'
}

const crawler = new Crawler({
  name: reservamosConf.name,
  trip: defaultTrip,
  url: reservamosConf.url({
    origin: defaultTrip.origin,
    destination: defaultTrip.destination,
    date: defaultTrip.date
  }),
  timeToLoad: reservamosConf.TIME_TO_LOAD,
  selectors: reservamosConf.selectors,
  deserializer: reservamosConf.deserializer
})

crawler.spider().then(data => {
  console.log('result', data)

  const store = new FireStore()
  store.save(data)

  crawler.close()
})

