const conf = {
  name: 'reservamos',
  url: ({origin, destination, date}) => `https://viaje.reservamos.mx/search/${origin}/${destination}/${date}/p/A1/providers`,
  TIME_TO_LOAD: 8000,
  selectors: {
    item: { path: '.result-box' },
    title: { path: '.results-provider-logo', attr: 'alt' },
    image: { path: '.results-provider-logo', attr: 'src' },
    price: { path: '.provider-price' },
    iconType: { path: '.summary-trip-icons > li > i', attr: 'class' }
  }
}

module.exports.conf = conf
