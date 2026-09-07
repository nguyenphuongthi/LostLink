

const path = require('path')
const express = require('express')

const configViewEngine = (app) => {
  app.use('/public', express.static(path.join(__dirname, '..', '..', 'public')))
}

module.exports = configViewEngine
