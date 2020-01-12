# amp-to-html

Create amp-story. with ease. 

#Install

    npm install amp-to-html

## Example

You can use local or cdn url to amp-story scripts

```js
const Amp = require('amp-to-html')
const type = 'cdn' //'cdn' or 'local'
const data = require('./src/data') //test story data

const ampToHtmlConfig = new Amp(type, {
    v0Path: 'https://cdn.ampproject.org/v0.js',
    ampStoryPath: 'https://cdn.ampproject.org/v0/amp-story-1.0.js',
    ampVideoPath: 'https://cdn.ampproject.org/v0/amp-video-0.1.js',
    ampAnimationPath: null,
    fontPath: '',
    customFontPath: ''
  })

ampToHtmlConfig.createFullStory({ampStory}, (html) => { // 
  console.log(html)
})
```
