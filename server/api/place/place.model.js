'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaceSchema = new Schema({
  name: String,
  img: String,
  description: String,
  review: String,
  tags: [String],
  url: String,
  hours: String
});

module.exports = mongoose.model('Place', PlaceSchema);