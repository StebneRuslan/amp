// const getStory = require('./src/storyPage.js')
// const getSinglePage = require('./src/singlePage.js')
// const data = require('./src/data.js')

const path = require('path')
const express = require('express')
const app = express()

let amp = class Amp {
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

    createFullStory(data, calback) {
        console.log('dataaaaaaaa', data)
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

module.exports = {amp}
// const amp = new Amp('cdn', {
//     v0Path: '/assets/libs/v0.js',
//     ampStoryPath: '/assets/libs/amp-story-0.1.js',
//     ampVideoPath: '/assets/libs/amp-video-0.1.js'
// })
// let single = amp.createSinglePage(data.data)
// let full = amp.createFullStory(data.data)
// console.log(amp)
// console.log('____________!!!!!!_____________')
// console.log(single)
