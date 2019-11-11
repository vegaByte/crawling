const puppeteer = require('puppeteer');
const $ = require('cheerio');
const fs = require('fs');
const sleep = require('../libs/helpers').sleep

class Crawler {
  constructor(args){
    this.instance = null
    this.url = args.url

    console.log({args})

    this.spider = this.spider.bind(this)
  }

  spider(){
    let page
    let browser
    const { url } = this

    puppeteer
      .launch()
      .then(function(_browser) {
        browser = _browser
        return browser.newPage();
      })
      .then(function(_page) {
        page = _page
        return page.goto(url).then(function() {
          return sleep(8000)
        });
      })
      .then(function () {
        return page.content();
      })
      .then(function(html) {
        setTimeout(() => {
          page.screenshot({path: 'screen.png'});

          fs.writeFile('result.html', html, function (err) {
            if (err) throw err
            console.log('Saved!')
          })

          let data = []

          $('.provider-price', html).each(function(){
            console.log($(this).text());
          })

          browser.close()

        }, 2000)
      })
      .catch(function(err) {
        //handle error
        console.log('ERROR', err)
        browser.close()
      });

  }
};

module.exports.Crawler = Crawler
