'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Props') + ' generator!'
    ));

    var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },
        {
            name: 'appUrl',
            message: 'What is your system url?'
        }
        ];
 
        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.appUrl = props.appUrl;
   
            done();
        }.bind(this));
  },


  writing: {

    //create app folder
    scaffoldFolders: function(){
      mkdirp(this.appName, function (err) {
        if (err) console.error(err)
        else console.log('directory created');
      });
    },

    copyTemplates: function(){ 
      var context = { 
        app_name: this.appName,
        app_url: this.appUrl
      };
 
      this.template("_development.properties", this.appName + "/development.properties", context);
    },
  },

  install: function () {
    this.installDependencies();
  }
});
