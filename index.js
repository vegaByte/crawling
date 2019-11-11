const puppeteer = require('puppeteer');
const $ = require('cheerio');
const fs = require('fs');
const url = 'https://viaje.reservamos.mx/search/monterrey/ciudad-de-mexico/30-nov-19/p/A1/providers';

let page
let browser


class TestClass {
  constructor(args){
    console.log('si jala!')
  }
}

async function sleep(timeout) {
  return new Promise((resolve, error) => {
    setTimeout(resolve, timeout)
  })
}

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

const i = new TestClass({x:1})
