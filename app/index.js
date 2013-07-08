'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AerogearGenerator = module.exports = function AerogearGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'qunit';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'qunit';
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AerogearGenerator, yeoman.generators.Base);

AerogearGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

AerogearGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.write('app/index.html', this.indexFile);
};

AerogearGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AerogearGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AerogearGenerator.prototype.bower = function bower() {
  this.copy('_bower.json', 'bower.json');
  this.copy('_.bowerrc', '.bowerrc');
};

AerogearGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
