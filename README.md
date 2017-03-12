# React Effects Scroll
React component to animate elements on scroll with animate.css
<br /><br />
**IMPORTANT**: This package created about 2 years ago when i first started learing React. <br />
I want to rewrite all, but not have the time. I have now accepted the last PR for react 15 version, but codestyle still bad.

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
import ScrollEffect from 'react-scroll-effects';

<ScrollEffect animate="fadeInUp">
  test 1
</ScrollEffect>

<ScrollEffect animate="fadeInUp">
  <div className="test">
    <span>text</span>
    <span>text</span>
    <span>text</span>
  </div>
</ScrollEffect>

<ScrollEffect className="element otherClass" animate="slideInRight" offset="-500" duration="2" callback={this.callbackAnimate.bind(this)}>
  <div className="test">
    <span>text</span>
    <span>text</span>
    <span>text</span>
  </div>
</ScrollEffect>

<ScrollEffect animate="zoomInUp" queueClass="queue" duration="2" queueDuration=".5">
  <ul>
    <li className="queue">
      test
    </li>
    <li className="queue">
      test
    </li>
    <li className="queue">
      test
    </li>
  </ul>
</ScrollEffect>

```
##Properties:
<b>offset</b> - By default, animation is activated when (scrollPositionY + window.height / 2) >= (elementPositionTop). But you can specify offset.<br />
<b>className</b> - Your class for block. You can specify one or multiple classes separated by a space.<br />
<b>duration</b> - Animate duration seconds.<br />
<b>queueClass</b> - Class name for queue. See the demo page (third block).<br />
<b>queueDuration</b> - Queue interval.<br />
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

