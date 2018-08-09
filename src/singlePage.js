const express = require('express')
const app = express()
const Amp = require('../index.js');

exports.getSinglePage = function(data) {
    console.log('a');
    console.log(data);
    app.render('ampSinglePage.ejs', data, function(err, html) {
        console.log(err);
        console.log(html.replace(/\n/g, ''));
        html.replace(/\n/g, '')
    });
}