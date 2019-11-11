const conf = {
  url: ({origin, destination, date}) => `https://viaje.reservamos.mx/search/${origin}/${destination}/${date}/p/A1/providers`,
  TIME_TO_LOAD: 8000,
  selectors: {
    item: '.result-box',
    title: '.results-provider-logo:alt',
    image: '.results-provider-logo:src',
    price: '.provider-price:text',
    iconType: '.summary-trip-icons > li > i:class'
  }
}

module.exports.conf = conf
