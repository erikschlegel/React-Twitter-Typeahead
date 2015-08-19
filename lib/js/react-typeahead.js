var React = require('react'),
    Bloodhound = require('typeahead.js/dist/bloodhound'),
    $ = require('jquery'),
    Typeahead = require('typeahead.js/dist/typeahead.jquery'),
    extend = require("extend"),
    ReactTypeahead;

ReactTypeahead = React.createClass({displayName: "ReactTypeahead",
  /**
  * 'proptypes' property
  * Declares all the properties that can be used to configure this component
  */
  propTypes: {
    bloodhound: React.PropTypes.object,
    typeahead: React.PropTypes.object,
    datasource: React.PropTypes.object,
    placeholder: React.PropTypes.string,
    inputClassName: React.PropTypes.string
  },

  /**
  * 'getDefaultProps' method
  * Sets default properties on the component
  */
  getDefaultProps: function() {
    return {
      bloodhound: {},
      typeahead: {},
      datasource: {},
      placeholder: ''
    }
  },

  /**
  * 'initOptions' method
  * This method sets up the typeahead with initial config parameters. The first set is default
  * and the other set is defined by the
  */
  initOptions: function () {
    var defaultMinLength = 2, config = {};

    var defaults = {
      bloodhound: {
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace
      },
      typeahead: {
        minLength: defaultMinLength,
        hint: true,
        highlight: true
      },
      datasource: {
        displayProperty: 'value',
        queryStr: '%QUERY'
      }
    };

    config.bloodhound = extend(true, {}, defaults.bloodhound, this.props.bloodhound);
    config.typeahead = extend(true, {}, defaults.typeahead, this.props.typeahead);
    config.datasource = extend(true, {}, defaults.datasource, this.props.datasource);

    return config;
  },

  loadScript: function(scriptURL){
    script = document.createElement('script');
    script.src = scriptURL;
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
  },

  /**
  * 'getInitialState' method
  * We want to make sure that the jquery and typeahead libraries are loaded into the DOM
  */
  getInitialState: function(){
    return {data: []};
  },
  /**
  * 'componentDidMount' method
  * Initializes react with the typeahead component.
  */
  componentDidMount: function () {
    var self = this,
    options = this.initOptions();

    var remoteCall = new Bloodhound(options.bloodhound);
    options.datasource.source = remoteCall;
    var typeaheadInput = React.findDOMNode(self);
    if(typeaheadInput)
    this.typeahead = $(typeaheadInput).typeahead(options.typeahead, options.datasource);

    this.bindCustomEvents();
  },

  render: function () {
    return (
      <input className="typeahead" type="text" placeholder={this.props.placeHolder} />
    );
  },

  bindCustomEvents: function(){
    var customEvents = this.props.customEvents;

    if (!customEvents)
    return;

    for (var event in customEvents)
    this.typeahead.on(event, customEvents[event]);
  }
});

module.exports = ReactTypeahead;
