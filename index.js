/* eslint node: true */
'use strict';

var path = require('path')
var defaults = require('lodash.defaults')
var Funnel = require('broccoli-funnel')
var mergeTrees = require('broccoli-merge-trees')

module.exports = {
  name: 'ember-cli-emojione-shim',

  included: function(app) {
    this._super.included.apply(this, arguments)

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app
    }

    this.app = app

    this.emojioneConfig = this.getConfig()

    var vendorDir = this.treePaths.vendor

    app.import(vendorDir + '/emojione/emojione.js')
    app.import(vendorDir + '/shims/emojione.js')
  },

  getConfig() {
    return defaults(this.app.options.emojioneShim, {
      importCSS: true,
      importAssets: true
    })
  },

  treeForVendor: function(vendorTree) {
    var trees = []

    if (vendorTree) {
      trees.push(vendorTree)
    }

    trees.push(new Funnel(getEmojionePath(), {
      destDir: 'emojione',
      include: [ 'emojione.js' ]
    }))

    return mergeTrees(trees)
  },

  treeForStyles: function(styleTree) {
    var trees = []

    if (this.emojioneConfig.importCSS) {
      trees.push(new Funnel(getEmojioneAssetPath(), {
        destDir: 'emojione',
        include: [
          'css/emojione.css',
          'css/emojione-awesome.css',
          'sprites/emojione.sprites.css'
        ]
      }))
    }

    if (styleTree) {
      trees.push(styleTree)
    }

    return this._super.treeForStyles(mergeTrees(trees, { overwrite: true }))
  },

  treeForPublic: function(publicTree) {
    var trees = []

    if (publicTree) {
      trees.push(publicTree)
    }

    if (this.emojioneConfig.importAssets) {
      trees.push(new Funnel(getEmojioneAssetPath(), {
        destDir: 'assets/emojione',
        exclude: [
          'css/*',
          'fonts/*',
          '**/*.css',
          '**/*.mustache'
        ]
      }))
    }

    return this._super.treeForPublic(mergeTrees(trees, { overwrite: true }))
  }
};

function getEmojionePath() {
  return path.dirname(require.resolve('emojione'))
}

function getEmojioneAssetPath() {
  var emojioneAssetPath = path.join(
    getEmojionePath(),
    '../../assets'
  )

  return emojioneAssetPath
}
