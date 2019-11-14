const puppeteer = require('puppeteer');
const $ = require('cheerio');
const fs = require('fs');
const sleep = require('../libs/helpers').sleep
const cachePath = require('../conf').conf.cachePath


// selectors: {
//   item: '.result-box',
//   title: '.results-provider-logo:alt',
//   image: '.results-provider-logo:src',
//   price: '.provider-price:text',
//   iconType: '.summary-trip-icons > li > i:class'
// }


class Crawler {
  constructor(args){
    this.name = args.name
    this.url = args.url
    this.selectors = args.selectors
    this.timeToLoad = args.timeToLoad
    this.trip = args.trip
    this.deserializer = args.deserializer

    this.page = null
    this.browser = null
    this.html = null

    this.saveHtmlCache = this.saveHtmlCache.bind(this)
    this.saveJsonCache = this.saveJsonCache.bind(this)
    this.jsonFormat = this.jsonFormat.bind(this)
    this.handleError = this.handleError.bind(this)
    this.spider = this.spider.bind(this)
    this.scrap = this.scrap.bind(this)
    this.close = this.close.bind(this)
  }

  saveHtmlCache(){
    return new Promise((resolve, reject) => {
      fs.writeFile(`${cachePath}/result.html`, this.html, {encoding: 'utf8', flag: 'w+'}, err => {
        if ( err ) { reject(err); return }
        console.log('save html cache')
        resolve(this.html)
      })
    })
  }

  jsonFormat(){
    return JSON.stringify({
      name: this.name,
      date: new Date()|0,
      tripOrigin: this.trip.origin,
      tripDestination: this.trip.destination,
      tripDate: this.trip.date,
      data: this.data
    }, null, 2)
  }

  saveJsonCache(){
    return new Promise((resolve, reject) => {
      const json = this.jsonFormat()
      fs.writeFile(`${cachePath}/result.json`, json, {encoding: 'utf8', flag: 'w+'}, err => {
        if ( err ) { reject(err); return }
        console.log('save json cache')
        resolve(json)
      })
    })
  }

  handleError(nessage, err=''){
    console.error(nessage, err)
    this.close()
  }

  spider(){
    console.log('spider:', this.url)
    return puppeteer
      .launch()
      .then(browser => {
        this.browser = browser
        return this.browser.newPage();
      })
      .then(page => {
        this.page = page
        return this.page.goto(this.url).then(() => sleep(this.timeToLoad));
      })
      .then(() => {
        return this.page.content();
      })
      .then(html => {
        this.html = html
        this.saveHtmlCache().catch(err => this.handleError('Error saving html cache', err))
        return this.scrap()
      })
      .catch(err => {
        console.log('error', err)
        this.close()
      });
  }

  scrap(){
    return new Promise((resolve, reject) => {
      let data = []
      const self = this

      const find = (context, selector) => {
        const $el = $(context).find(selector.path)
        return selector.attr ? $el.attr(selector.attr) : $el.text()
      }

      $(self.selectors.item.path, self.html).each(function(){
        const title = find(this, self.selectors.title)
        const image = find(this, self.selectors.image)
        const price = find(this, self.selectors.price)
        const iconType = find(this, self.selectors.iconType)

        data = [...data, self.deserializer({ title, image, price, iconType })]
      })

      self.data = data

      self.saveJsonCache().catch(err => this.handleError('Error saving json cache', err))
      resolve(self.data)
    })
  }

  close(){
    this.browser.close()
    console.log('close')
  }

};

module.exports.Crawler = Crawler
