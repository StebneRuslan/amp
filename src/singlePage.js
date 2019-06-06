const express = require('express')
const app = express()
const Amp = require('../index.js');

exports.getSinglePage = function(data) {
    app.render('ampSinglePage.ejs', data, function(err, html) {
        html.replace(/\n/g, '')
    });
}