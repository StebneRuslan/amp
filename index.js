const getStory = require('./src/storyPage.js')
const getSinglePage = require('./src/singlePage.js')
const data = require('./src/data.js')

const express = require('express')
const app = express()

class Amp {
    constructor(type, configPaths) {
        this.type = type;
        this.configPaths = configPaths
    }

    setConfigPath(data) {
        data.type = this.type
        data.v0Path = this.configPaths.v0Path
        data.ampStoryPath = this.configPaths.ampStoryPath
        data.ampVideoPath = this.configPaths.ampVideoPath
        return data;
    }

    createSinglePage(data) {
        let resultHtml = ''
        let fullData = this.setConfigPath(data);
        app.render('ampSinglePage.ejs', fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
        });
        return resultHtml
    }

    createFullStory(data) {
        let resultHtml = ''
        data.type = this.type
        let fullData = this.setConfigPath(data);
        app.render('ampViewer.ejs', fullData, function(err, html) {
            if (err) {
                console.log(err);
            } else {
                resultHtml = html.replace(/\n/g, '')
            }
        });
        return resultHtml
    }
}

exports = Amp
// const amp = new Amp('cdn', {
//     v0Path: 'https://cdn.ampproject.org/v0.js',
//     ampStoryPath: 'https://cdn.ampproject.org/v0/amp-story-1.0.js',
//     ampVideoPath: 'https://cdn.ampproject.org/v0/amp-video-0.1.js'
// })
// let single = amp.createSinglePage(data.data)
// let full = amp.createFullStory(data.data)
