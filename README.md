# React Effects Scroll
React component to animate elements on scroll with animate.css
<br />
## Demo page:
http://anorudes.github.io/React-Scroll-Effect/

## Install
``
npm install react-scroll-effects --save
``
<br />
Include "animate.css" from https://daneden.github.io/animate.css/

## Usage:

```
import ScrollEffect from 'react-scroll-effect';

{ /* Simple: */ }
<ScrollEffect animate="fadeInUp">
  Test
</ScrollEffect>

{ /* All Props: */ }
<ScrollEffect className="element" animate="slideInRight" offset="-500" duration="2" callback={this.callbackAnimate.bind(this)}>
  Test 2
</ScrollEffect>

```
##Properties:
<b>offset</b> - By default, animation is activated when (scrollPositionY + window.height / 2) >= (elementPositionTop). But you can specify offset.<br />
<b>className</b> - Your class for custom styles. For example: ".element { position: absolute; bottom: 100px }" You can specify one or multiple classes separated by a space.<br />
<b>duration</b> - Animate duration seconds.<br />
<b>callback</b> - Callback function.

## Files:
<b>src/**</b> - component<br />
<b>demo/**</b> - demo page. For build: "bower install && npm install"

## Build demo page
```
$ npm install
$ gulp
```

## Depending
https://daneden.github.io/animate.css/


## Build
```
$ gulp
```
