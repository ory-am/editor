# ![Ory editor](logo.png)

[![Build Status](https://travis-ci.com/ory-am/editor.svg?token=gtodfPz6nLDS6xphYxdJ&branch=master)](https://travis-ci.com/ory-am/editor)

The Ory Editing Platform is not another contenteditable hack. With state of the art browser technology and tooling,
you can finally say goodbye to contenteditable hacks, html purifiers, steep learning curves and poorly designed plugin APIs.

Build interactive, responsive content in minutes. Empower designers to enforce design. Let developers focus
on important issues. Amaze authors with easy of use and control.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Demo](#demo)
- [Quickstart](#quickstart)
- [Contribute](#contribute)
- [FAQ](#faq)
  - [How can I run E2E tests using chrome?](#how-can-i-run-e2e-tests-using-chrome)
  - [How can I install the editor using bower?](#how-can-i-install-the-editor-using-bower)
  - [How can I install the editor using the CDN?](#how-can-i-install-the-editor-using-the-cdn)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Demo

## Quickstart

If you are using npm, you can install the editor as follows:

```
npm install ory-editor
```

Depending on whether you use ECMAScript 6 or ECMAScript 5, the setup looks as follows:

```js
// ECMAScript 6
import Editor from 'ory-editor';
const editor = new Editor();

// ECMAScript 5
var Editor = require('ory-editor');
var editor = new Editor();
```

## Contribute

You need [Node](https://nodejs.org) installed on your system.

```
$ git clone https://github.com/ory-am/editor.git
$ cd editor

# Install depdendencies
$ npm i

# run the tests in watch mode
$ npm run test:watch 

# run eslint in watch mode
$ npm run lint: watch

# run dev server with live reload
$ npm run dev

# open the editor in your browser
$ open http://localhost:3000/
```

## FAQ

### How can I run E2E tests using chrome?

To run E2E tests in Chrome, you need the Chrome Driver in $PATH, see https://github.com/nightwatchjs/nightwatch/wiki/chrome-setup

### How can I install the editor using bower?

```
bower install ory-editor
```

### How can I install the editor using the CDN?

```html
<script src="https://cdn.foobar.com/ory/latest/ory-editor.js"></script>
<script type="text/javascript">
  var editor = new Editor();
</script>
```
