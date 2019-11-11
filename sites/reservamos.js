const conf = {
  url: ({origin, destination, date}) => `https://viaje.reservamos.mx/search/${origin}/${destination}/${date}/p/A1/providers`
}

module.exports.conf = conf
