# React Effects Scroll
React component to animate elements on scroll with animate.css
<br />
## Demo:
http://anorudes.github.io/React-Scroll-Effect/

## Usage:
```
{ /* Simple: */ }
<ScrollEffect animate="fadeInUp">
  Test
</ScrollEffect>

{ /* All Props: */ }
<ScrollEffect className="element" animate="slideInRight" offset="-500" duration="2" callback={this.callbackAnimate.bind(this)}>
  Test 2
</ScrollEffect>

```
##Props:
<b>offset</b> - By default, animation is activated when (scrollPositionY + window.height / 2) >= (elementPositionTop). But you can specify offset.<br />
<b>className</b> - Your class for custom styles. For example: ".element { position: absolute; bottom: 100px }" You can specify one or multiple classes separated by a space.<br />
<b>duration</b> - Animate duration seconds.<br />
<b>callback</b> - Callback function.

## Folders:
<b>component:</b> src/scroll-effect.js<br />
<b>demo page:</b> demo/<br />

## Install
```
$ npm install
$ bower install
```

## Depending
https://daneden.github.io/animate.css/


## Build
```
$ gulp
```


