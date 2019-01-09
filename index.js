// const getStory = require('./src/storyPage.js')
// const getSinglePage = require('./src/singlePage.js')
// const data = require('./src/data.js')

const path = require('path')
const data = require('./src/data')
const express = require('express')
const app = express()
let Amp = class Amp {
    constructor(type, configPaths) {
        this.type = type;
        this.configPaths = configPaths
    }

    setConfigPath(data) {
        data.type = this.type
        data.v0Path = this.configPaths.v0Path
        data.ampStoryPath = this.configPaths.ampStoryPath
        data.ampVideoPath = this.configPaths.ampVideoPath
        data.ampAnimationPath = this.configPaths.ampAnimationPath
        data.fontPath = this.configPaths.fontPath
        return data;
    }

    createSinglePage(data, calback) {
        let resultHtml = ''
        let fullData = this.setConfigPath(data);
        app.render(path.resolve(__dirname, 'views', 'ampSinglePage.ejs'), fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
            calback(resultHtml)
        });
    }

    createStaticSinglePage(data, calback) {
        let resultHtml = ''
        let fullData = this.setConfigPath(data);
        app.render(path.resolve(__dirname, 'views', 'ampPupeteerSinglePage.ejs'), fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
            calback(resultHtml)
        });
    }

    createSinglePageWithoutScripts(data, calback) {
        let resultHtml = ''
        let fullData = this.setConfigPath(data);
        app.render(path.resolve(__dirname, 'views', 'singlePageWithoutScripts.ejs'), fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
            calback(resultHtml)
        });
    }

    createFullStory(data, calback) {
        let resultHtml = ''
        data.type = this.type
        let fullData = this.setConfigPath(data);
        app.render(path.resolve(__dirname, 'views', 'ampViewer.ejs'), fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
            calback(resultHtml)
        });
    }
}

module.exports = Amp
// const amp = new Amp('cdn', {
//     v0Path: 'https://cdn.ampproject.org/v0.js',
//     ampStoryPath: 'https://cdn.ampproject.org/v0/amp-story-1.0.js',
//     ampVideoPath: 'https://cdn.ampproject.org/v0/amp-video-0.1.js',
//     ampAnimationPath: null,
//     fontPath: '..'
// })
// let single = amp.createSinglePageWithoutScripts(data.data, (resultHtml)=> {console.log(resultHtml)})
// console.log('____________!!!!!!_____________')
// console.log(single)
