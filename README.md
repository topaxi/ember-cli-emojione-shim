# Ember-cli-emojione-shim

ember-cli shim for [emojione](http://emojione.com/).

## Usage

Import emojione css in `app/styles/app.css`:
```css
@import 'emojione/css/emojione.css';
```

Import emojione js in app code:
```javascript
import emojione from 'emojione'

emojione.shortnameToImage(':smile:')
```

For more examples, checkout the official emojione docs:
http://git.emojione.com/demos/latest/index.html#js

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
