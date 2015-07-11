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
  test 1
</ScrollEffect>

{ /* Simple: */ }
<ScrollEffect animate="fadeInUp">
  <div className="test">
    <span>text</span>
    <span>text</span>
    <span>text</span>
  </div>
</ScrollEffect>

{ /* Full: */ }
<ScrollEffect className="element otherClass" animate="slideInRight" offset="-500" duration="2" callback={this.callbackAnimate.bind(this)}>
  <div className="test">
    <span>text</span>
    <span>text</span>
    <span>text</span>
  </div>
</ScrollEffect>

```
##Properties:
<b>offset</b> - By default, animation is activated when (scrollPositionY + window.height / 2) >= (elementPositionTop). But you can specify offset.<br />
<b>className</b> - Your class for block. You can specify one or multiple classes separated by a space.<br />
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
