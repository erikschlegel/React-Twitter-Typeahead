'use strict';

var React = require('react');
var ReactTypeahead = require('./lib/js/react-typeahead');
var demoDataCallRoot = 'http://demos.telerik.com/kendo-ui/';

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

var bloodhoundConfig = {
	local: states
};

React.render(
    <ReactTypeahead bloodhound={bloodhoundConfig} 
                    placeHolder="States in the U.S"/>,
    document.getElementById('#typeaheadDiv')
);

var responseTransformation = function(rsp){
      var initRsp = rsp.items, maxCharacterLgth = 25;
      var finalResult = [];
      
      initRsp.map(function(item){
          var title = item.volumeInfo.title;
          finalResult.push({value: title.length>maxCharacterLgth?title.substring(0, maxCharacterLgth):title});
      });

      return finalResult;
};

var bloodhoundRemoteConfig = {
  prefetch: 'https://www.googleapis.com/books/v1/volumes?q=reactjs',
  remote: {
    url: 'https://www.googleapis.com/books/v1/volumes?q=%QUERY',
    wildcard: '%QUERY',
    transform: responseTransformation
  }
};

var dsRemote = {
  name: 'best-pictures',
  display: 'value'
};

var typeaheadConfig = {
    limit: 10;
};

React.render(
    <ReactTypeahead bloodhound={bloodhoundRemoteConfig} 
                    datasource={dsRemote}
                    typeahead={typeaheadConfig}
                    placeHolder="Lets find something cool to read" />,
    document.getElementById('#typeaheadDivRpc')
);