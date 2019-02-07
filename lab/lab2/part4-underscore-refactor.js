(function(){

  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

    /* =====================

    # Lab 2, Part 4 — (Optional, stretch goal)

    ## Introduction

      You've already seen this file organized and refactored. In this lab, you will
      try to refactor this code to be cleaner and clearer - you should use the
      utilities and functions provided by underscore.js. Eliminate loops where possible.

    ===================== */

    // Mock user input
    // Filter out according to these zip codes:
    var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
    // Filter according to enrollment that is greater than this variable:
    var minEnrollment = 300;


    // clean data
    //for (var i = 0; i < schools.length - 1; i++) {
      // If we have '19104 - 1234', splitting and taking the first (0th) element
      // as an integer should yield a zip in the format above
    //  if (typeof schools[i].ZIPCODE === 'string') {
    //    split = schools[i].ZIPCODE.split(' ');
      //  normalized_zip = parseInt(split[0]);
    //    schools[i].ZIPCODE = normalized_zip;
    //  }

  //new refactored codes :clean data
      _.each(schools, function(i) {
         if (typeof i.ZIPCODE === 'string') {
           i.ZIPCODE = _.first(i.ZIPCODE.split(' '));
         }
       });

      // Check out the use of typeof here — this was not a contrived example.
      // Someone actually messed up the data entry
      //if (typeof schools[i].GRADE_ORG === 'number') {  // if number
        //schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL < 1;
      //  schools[i].HAS_ELEMENTARY = 1 < schools[i].GRADE_LEVEL < 6;
      //  schools[i].HAS_MIDDLE_SCHOOL = 5 < schools[i].GRADE_LEVEL < 9;
        //schools[i].HAS_HIGH_SCHOOL = 8 < schools[i].GRADE_LEVEL < 13;
    //  } else {  // otherwise (in case of string)
    //    schools[i].HAS_KINDERGARTEN = schools[i].GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
    //    schools[i].HAS_ELEMENTARY = schools[i].GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
    //    schools[i].HAS_MIDDLE_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
    //    schools[i].HAS_HIGH_SCHOOL = schools[i].GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
  //    }
   //  }

   //new refactored codes : the use of typeof
     _.each(schools, function(j) {
        if (_.isNumber(j.GRADE_LEVEL)) {  // if number
          j.HAS_KINDERGARTEN = j.GRADE_LEVEL < 1;
          j.HAS_ELEMENTARY = 1 < j.GRADE_LEVEL < 6;
          j.HAS_MIDDLE_SCHOOL = 5 < j.GRADE_LEVEL < 9;
          j.HAS_HIGH_SCHOOL = 8 < j.GRADE_LEVEL < 13;
        } else if (!_.isNumber(j.GRADE_ORG)) { // otherwise (in case of string)
          j.HAS_KINDERGARTEN = j.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
          j.HAS_ELEMENTARY = j.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
          j.HAS_MIDDLE_SCHOOL = j.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
          j.HAS_HIGH_SCHOOL = j.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
        }
      });


  // filter data
  var filtered_data = [];
  var filtered_out = [];
    //for (var i = 0; i < schools.length - 1; i++) {
    //isOpen = schools[i].ACTIVE.toUpperCase() == 'OPEN';
      //isPublic = (schools[i].TYPE.toUpperCase() !== 'CHARTER' ||
                  //schools[i].TYPE.toUpperCase() !== 'PRIVATE');
      //isSchool = (schools[i].HAS_KINDERGARTEN ||
                //  schools[i].HAS_ELEMENTARY ||
                //  schools[i].HAS_MIDDLE_SCHOOL ||
              //    schools[i].HAS_HIGH_SCHOOL);
    //  meetsMinimumEnrollment = schools[i].ENROLLMENT > minEnrollment;
    //  meetsZipCondition = acceptedZipcodes.indexOf(schools[i].ZIPCODE) >= 0;
    //  filter_condition = (isOpen &&
                          //isSchool &&
                        //  meetsMinimumEnrollment &&
                        //  !meetsZipCondition);

  //new refactored codes :filter data
  _.each(schools, function(k) {
    isOpen = k.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (k.TYPE.toUpperCase() !== 'CHARTER' ||
                k.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (k.HAS_KINDERGARTEN || k.HAS_ELEMENTARY ||
              k.HAS_MIDDLE_SCHOOL ||  k.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = k.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(k.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
      if (filter_condition) {
        filtered_data.push(k);
      } else {
        filtered_out.push(k);
      }
    });
    console.log('Included:', filtered_data.length);
    console.log('Excluded:', filtered_out.length);



    // main loop
   var color;
  //  for (var i = 0; i < filtered_data.length - 1; i++) {
      //isOpen = filtered_data[i].ACTIVE.toUpperCase() == 'OPEN';
    //  isPublic = (filtered_data[i].TYPE.toUpperCase() !== 'CHARTER' ||
            //      filtered_data[i].TYPE.toUpperCase() !== 'PRIVATE');
    //  meetsMinimumEnrollment = filtered_data[i].ENROLLMENT > minEnrollment;

      // Constructing the styling  options for our map
    //  if (filtered_data[i].HAS_HIGH_SCHOOL){
    //    color = '#0000FF';
  //    } else if (filtered_data[i].HAS_MIDDLE_SCHOOL) {
  //      color = '#00FF00';
      //} else {
    //    color = '##FF0000';
    //  }

  //new refactored codes :Constructing the styling  options for our map
    _.each(filtered_data,function(m){
     isOpen = m.ACTIVE.toUpperCase() == 'OPEN';
     isPublic = (m.TYPE.toUpperCase() !== 'CHARTER' ||
                 m.TYPE.toUpperCase() !== 'PRIVATE');
     meetsMinimumEnrollment = m.ENROLLMENT > minEnrollment;
     if (m.HAS_HIGH_SCHOOL){
       color = '#0000FF';
     } else if (m.HAS_MIDDLE_SCHOOL) {
       color = '#00FF00'
     } else {
       color = '##FF0000';
     }
      var pathOpts = {'radius': m.ENROLLMENT / 30, // The style options
                      'fillColor': color};
      L.circleMarker([m.Y, m.X], pathOpts)
        .bindPopup(m.FACILNAME_LABEL)
        .addTo(map);
    })

})();
