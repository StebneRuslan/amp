const express = require('express')
const app = express()

exports.getStory = function(data) {
    console.log('a');
    console.log(data);
    app.render('ampViewer.ejs', data, function(err, html) {
        console.log(err);
        console.log(html.replace(/\n/g, ''));
    });
}