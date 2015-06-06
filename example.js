'use strict';

var React = require('react');
var ReactTypeahead = require('./lib/js/react-typeahead');
var demoDataCallRoot = 'http://demos.telerik.com/kendo-ui/';
var Handlebars = require('handlebars');

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

var handlerbarTemplate = '<div class="tt-custom-row"> ' + 
                                   '     <span class="tt-custom-cell tt-custom-thumbnail">' + 
                                   '         <img src="{{thumbnail}}" />' + 
                                   '     </span>' + 
                                   '     <span class="tt-custom-cell">' +
                                   '           <h3>{{value}}</h3>' + 
                                   '           <p>{{description}}</p>' + 
                                   '     </span>' +
                                   ' </div>';

var header = '<div><span class="tt-custom-header" style="width:25%">Book Cover</span><span style="width:75%" class="tt-custom-header">Book Title/Description</span>'

var bloodhoundConfig = {
	local: states
};

React.render(
    <ReactTypeahead bloodhound={bloodhoundConfig} 
                    placeHolder="States - A basic example"/>,
    document.getElementById('#typeaheadDiv')
);

var responseTransformation = function(rsp){
      var initRsp = rsp.items, maxCharacterTitleLgth = 29, maxDescLength = 80;
      var finalResult = [];
      
      initRsp.map(function(item){
          var title = item.volumeInfo.title;
          finalResult.push({value: title.length>maxCharacterTitleLgth?title.substring(0, maxCharacterTitleLgth):title,
                            thumbnail: item.volumeInfo.imageLinks.thumbnail, 
                            description:(item.volumeInfo.description)?item.volumeInfo.description.substring(0, maxDescLength):''});
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
  name: 'books-to-buy',
  display: 'value',
  limit: 8,
  templates: {
    header: header,
    pending: '<div style="padding-left:5px;">Processing...</div>',
    empty: '<div>unable to find any books that matched your query</div>',
    suggestion: Handlebars.compile(handlerbarTemplate)
  }
};

var typeaheadConfig = {highlight:false};

React.render(
    <ReactTypeahead bloodhound={bloodhoundRemoteConfig} 
                    datasource={dsRemote}
                    typeahead={typeaheadConfig}
                    placeHolder="A remote call + custom template" />,
    document.getElementById('#typeaheadDivRpc')
);