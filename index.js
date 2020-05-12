const path = require('path')
const pick = require('lodash/pick')
const express = require('express')
const app = express()
let Amp = class Amp {
  constructor (type, configPaths) {
    this.type = type
    this.configPaths = configPaths
  }

  setConfigPath (data) {
    return Object.assign(data, Object.assign({ type: this.type }, pick(this.configPaths, ['v0Path', 'ampStoryPath', 'ampVideoPath', 'ampAnimationPath', 'fontPath'])))
  }

  createSinglePage (data, calback) {
    let resultHtml = ''
    let fullData = this.setConfigPath(data)
    fullData.snippets = []
    fullData.bookendLink = ''
    fullData.fontsHost = ''
    app.render(path.resolve(__dirname, 'views', 'ampSinglePage.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      calback(resultHtml)
    })
  }

  createStaticSinglePage (data, calback) {
    let resultHtml = ''
    let fullData = this.setConfigPath(data)
    fullData.snippets = []
    fullData.bookendLink = ''
    fullData.fontsHost = ''
    app.render(path.resolve(__dirname, 'views', 'ampPupeteerSinglePage.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      calback(resultHtml)
    })
  }

  createSinglePageWithAnimations (data, calback) {
    let resultHtml = ''
    let fullData = this.setConfigPath(data)
    fullData.snippets = []
    fullData.bookendLink = ''
    fullData.fontsHost = ''
    app.render(path.resolve(__dirname, 'views', 'ampSinglePageWithAnimations.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      calback(resultHtml)
    })
  }

  createSinglePageWithoutScripts (data, calback) {
    let resultHtml = ''
    let fullData = this.setConfigPath(data)
    fullData.snippets = []
    fullData.bookendLink = ''
    fullData.fontsHost = ''
    app.render(path.resolve(__dirname, 'views', 'singlePageWithoutScripts.ejs'), fullData, function (err, html) {
      if (err) {
        console.log(err)
      } else {
        resultHtml = html.replace(/\n/g, '')
      }
      calback(resultHtml)
    })
  }

  createFullStory ({ config, userAnalytics = null, customerAnalyticsKey = null, snippets = [], bookendLink = '', fontsHost }, callback) {
    let resultHtml = ''
    config.type = this.type
    let fullData = this.setConfigPath(config)
    if (config.ampStory) {
      config.ampStory.googleAnalytics = userAnalytics
      config.ampStory.customerAnalyticsKey = customerAnalyticsKey
    }
    config.snippets = snippets
    config.bookendLink = bookendLink
    config.fontsHost = fontsHost || 'https://fonts.cutnut.tv/'
    app.render(path.resolve(__dirname, 'views', 'ampViewer.ejs'), fullData, function (err, html) {
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
