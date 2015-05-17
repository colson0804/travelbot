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
      'It measures 33 by 66 by 42 feet (10 by 20 by 13 m), and weighs 110 short tons (100 t; 98 long tons).'
  }, {
    name: 'Weiner\s Circle',
    img: 'assets/images/weinercircle.jpg',
    description: 'The Wieners Circle is a hot dog stand in the Lincoln Park neighborhood of Chicago, Illinois, ' +
      'United States.[1] It is famous for four things: its signature Maxwell Street Char-dogs, hamburgers, ' +
      'cheese fries, and the mutual verbal abuse between the employees and the customers during the late-weekend hours.'
  }, {
    name: 'Willis Tower',
    img: 'assets/images/willis_tower.jpg',
    description: 'The Willis Tower, built as and still commonly referred to as Sears Tower, is a 108-story, 1,451-foot ' +
      '(442 m) skyscraper in Chicago, Illinois, United States.[2] At completion in 1973, it surpassed the World Trade Center ' +
      'towers in New York to become the tallest building in the world, a title it held for nearly 25 years. ' +
      'The Willis Tower is the second-tallest building in the United States and the 12th-tallest in the world. ' +
      'More than one million people visit its observation deck each year, making it one of Chicago\'s most popular tourist ' +
      'destinations. The structure was renamed in 2009 by the Willis Group as part of its lease on a portion of the ' +
      'tower\'s space.'
  }, {
    name: 'Gino\'s East',
    img: 'assets/images/ginos.jpg',
    description: 'Gino\'s East is a Chicago-based restaurant chain, notable for its deep-dish pizza (sometimes called ' +
      'Chicago-style pizza), and for its interior walls, which patrons have covered in graffiti and etchings. The restaurant ' +
      'features deep-dish pizza baked in cast-iron pans, as well as sandwiches, soups and salads.'
  }, {
    name: 'Green Mill',
    img: 'assets/images/greenmill.jpeg',
    description: 'The Green Mill Cocktail Lounge (or Green Mill Jazz Club) is an entertainment venue on Broadway in ' +
      'Uptown, Chicago. It is known for its jazz and poetry performances, along with its connections to Chicago mob history.'
  }, {
    name: 'Art Institute of Chicago',
    img: 'assets/images/art_institute.jpg',
    description: 'The Art Institute of Chicago (AIC) is an encyclopedic art museum located in Chicago\'s Grant Park. ' +
      'It features a collection of Impressionist and Post-Impressionist art in its permanent collection. Its holdings ' +
      'also include American art, Old Masters, European and American decorative arts, Asian art, modern and contemporary ' +
      'art, and architecture and industrial and graphic design. In addition, it houses the Ryerson & Burnham Libraries.'
  }, {
    name: 'Wildberry Pancakes and Cafe',
    img: 'assets/images/wildberry.jpg',
    description: 'Pancakes & other big portions of American eats draw hungry folks to this breakfast-lunch cafe.'
  }, {
    name: 'Cub\'s Game at Wrigley Field',
    img: 'assets/images/wrigley_field.jpg',
    description: 'Wrigley Field is a stadium located in Chicago, Illinois, United States, and the home ballpark of the ' +
      'Chicago Cubs. It was built in 1914 as Weeghman Park for the Chicago Federal League baseball team, the Chicago Whales.'
  }, {
    name: 'The Berghoff',
    img: 'assets/images/berghoff.jpg',
    description: 'The Berghoff restaurant, at 17 West Adams Street, near the center of the Chicago Loop, was opened in 1898 ' +
      'by Herman Joseph Berghoff and has become a Chicago landmark.'
  }, {
    name: 'Steppenwolf Theater',
    img: 'assets/images/steppenwolf.jpg',
    description: 'Steppenwolf Theatre Company is a Tony Award-winning Chicago theatre company founded in 1974 by Gary Sinise, ' +
      'Terry Kinney, and Jeff Perry in the Unitarian church on Half Day Road in Deerfield.'
  });
});