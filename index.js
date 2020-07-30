const path = require('path')
const pick = require('lodash/pick')
const express = require('express')
const app = express()
let Amp = class Amp {
  constructor (type, configPaths) {
    this.type = type
    this.configPaths = configPaths
  }

  setConfigPath ({ data, fontHost = '', type, snippets = [], zipExport = false, bookendLink = '' }) {
    return Object.assign(data, Object.assign({
      snippets,
      bookendLink,
      fontsHost: fontHost || 'https://fonts.cutnut.tv/',
      zipExport,
      type: type || this.type
    }, pick(this.configPaths, ['v0Path', 'ampStoryPath', 'ampVideoPath', 'ampAnimationPath', 'fontPath'])))
  }

  createSinglePage (data, callback) {
    let resultHtml = ''
    app.render(path.resolve(__dirname, 'views/ampSinglePage.ejs'), this.setConfigPath({ data }), function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      callback(resultHtml)
    })
  }

  createStaticSinglePage (data, callback) {
    let resultHtml = ''
    app.render(path.resolve(__dirname, 'views/ampPupeteerSinglePage.ejs'), this.setConfigPath({ data }), function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      callback(resultHtml)
    })
  }

  createSinglePageWithAnimations (data, callback) {
    let resultHtml = ''
    app.render(path.resolve(__dirname, 'views/ampSinglePageWithAnimations.ejs'), this.setConfigPath({ data }), function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      callback(resultHtml)
    })
  }

  createSinglePageWithoutScripts (data, fontHost, callback) {
    let resultHtml = ''
    let fullData = this.setConfigPath({ data, fontHost })
    app.render(path.resolve(__dirname, 'views/singlePageWithoutScripts.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      callback(resultHtml)
    })
  }

  createFullStory ({ config, userAnalytics = null, customerAnalyticsKey = null, snippets = [], bookendLink = '', fontsHost, zipExport = false }, callback) {
    let resultHtml = ''
    let fullData = this.setConfigPath({ data: config, fontHost: fontsHost, snippets, bookendLink, zipExport })
    if (fullData.ampStory) {
      fullData.ampStory.googleAnalytics = userAnalytics
      fullData.ampStory.customerAnalyticsKey = customerAnalyticsKey
    }
    app.render(path.resolve(__dirname, 'views/ampViewer.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      callback(resultHtml)
    })
  }
}

module.exports = Amp

// const fs = require('fs')
// const data = require('./src/data')
// const amp = new Amp('cdn', {
//   v0Path: 'https://cdn.ampproject.org/v0.js',
//   ampStoryPath: 'https://cdn.ampproject.org/v0/amp-story-1.0.js',
//   ampVideoPath: 'https://cdn.ampproject.org/v0/amp-video-0.1.js',
//   ampAnimationPath: null,
//   fontPath: '..'
// })
//
// const snippets = [{
//   headCode: 'PHNjcmlwdCBhc3luYz0iIiBjdXN0b20tZWxlbWVudD0iYW1wLXZpZGVvIiBzcmM9Imh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwL2FtcC12aWRlby0wLjEuanMxMTExMTExMTExMTExMTEiPjwvc2NyaXB0Pg==',
//   bodyCode: ''
// }, {
//   headCode: 'PHNjcmlwdCBhc3luYz0iIiBjdXN0b20tZWxlbWVudD0iYW1wLXZpZGVvIiBzcmM9Imh0dHBzOi8vY2RuLmFtcHByb2plY3Qub3JnL3YwL2FtcC12aWRlby0wLjEuanMyMjIyMjIyMjIyIj48L3NjcmlwdD4=',
//   bodyCode: ''
// }]
//
// let single = amp.createFullStory({ config: data.data, userAnalytics: { trackingProductId: '', trackingAccountId: 'UA-97508922-1', email: '', ivwId: '', ivwComment: '', ivwCode: '' }, customerAnalyticsKey: 99999, snippets: snippets }, (resultHtml) => {
//   // fs.writeFileSync('test.html', resultHtml)
//   console.log('resultHtml', resultHtml)
// })
