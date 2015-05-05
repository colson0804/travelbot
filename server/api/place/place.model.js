'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  img: String,
  description: String,
  lat: Number,
  long: Number
});

module.exports = mongoose.model('Place', PlaceSchema);