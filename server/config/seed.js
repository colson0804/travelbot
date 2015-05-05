/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Place = require('../api/place/place.model');


Place.find({}).remove(function() {
  Place.create({
    name : 'Cloud Gate',
    img: 'assets/images/cloudgate800.jpg',
    description : 'Cloud Gate is a public sculpture by Indian-born British artist Anish Kapoor, that is the ' +
      'centerpiece of AT&T Plaza at Millennium Park in the Loop community area of Chicago, Illinois. The sculpture ' +
      'and AT&T Plaza are located on top of Park Grill, between the Chase Promenade and McCormick Tribune Plaza & ' +
      'Ice Rink. Constructed between 2004 and 2006, the sculpture is nicknamed The Bean because of its bean-like ' +
      'shape. Made up of 168 stainless steel plates welded together, its highly polished exterior has no visible seams. ' +
      'It measures 33 by 66 by 42 feet (10 by 20 by 13 m), and weighs 110 short tons (100 t; 98 long tons).',
    lat: 41.8827,
    long: 87.6233
  });
});