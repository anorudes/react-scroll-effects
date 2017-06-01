import React, { Component, PropTypes } from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';

export default class ScrollEffect extends Component {
  static posTop() {
    if (typeof window.pageYOffset !== 'undefined') {
      return window.pageYOffset;
    } else if (document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    } else if (document.body.scrollTop) {
      return document.body.scrollTop;
    }
    return 0;
  }

  constructor() {
    super();
    this.state = {
      animated: false
    };
    if (window && window.addEventListener) {
      window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 200));
    }
  }

  componentDidMount() {
    this.handleScroll();
  }

  componentWillUnmount() {
    if (window && window.addEventListener) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  // This is for the callback function to work.
  singleAnimate() {
    this.setState({
      animated: true
    });
    /* callback */
    setTimeout(() => {
      this.props.callback();
    }, this.props.duration * 1000);
  }

  // This is for the queueClass to work.
  queueAnimate() {
    const element = this.node;
    const checkClass = el =>
      el.className === this.props.queueClass;
    let number = 0;
    const setClass = (el) => {
      const element1 = el;
      element1.style.visibility = 'hidden';
      setTimeout(() => {
        element1.style.visibility = 'visible';
        element1.className = `${element1.className} animated ${this.props.animate}`;
      }, number * (this.props.queueDuration * 1000));
      number += 1;
    };
    const findClass = (element2) => {
      Array.prototype.forEach.call(element2.childNodes, (child) => {
        findClass(child);
        if (checkClass(child)) {
          setClass(child);
        }
      });
    };

    // Find queue classes 
    findClass(element);

    // Callback 
    setTimeout(() => {
      this.props.callback();
    }, this.props.duration * 1000 * number);
  }

  handleScroll() {
    if (!this.state.animated) {
      const element = this.node;
      const top = ScrollEffect.posTop();
      const elementPositionY = element.getBoundingClientRect().top + top;
      const scrollPositionY = window.scrollY ? window.scrollY : window.pageYOffset;
      const windowHeight = window.innerHeight;
      if (scrollPositionY + (windowHeight) >= elementPositionY + (this.props.offset * 1)) {
        this.setState({
          animated: true
        });
        if (this.props.queueClass) {
          this.queueAnimate();
        }
        if (this.props.callback) {
          this.singleAnimate();
        }
      }
    }
  }

  render() {
    const { props, state } = this;

    let classes = classNames({
      animated: true,
      [props.animate]: state.animated && props.queueClass === ''
    });
    classes += ` ${props.className}`;

    const style = state.animated ? {} : {
      visibility: 'hidden'
    };

    if (props.duration !== '') {
      style.WebkitAnimationDuration = `${props.duration}s`;
      style.animationDuration = `${props.duration}s`;
    }

    return (
      <div
        className={classes}
        style={{style, ...props.style}}
        ref={(node) => { this.node = node; }}
      >
        {props.children}
      </div>
    );
  }
}

ScrollEffect.defaultProps = {
  animate: 'fadeInUp',
  offset: 100,
  className: '',
  duration: 1,
  queueDuration: 1,
  queueClass: '',
  callback: () => {}
};

ScrollEffect.propTypes = {
  animate: PropTypes.string,
  callback: PropTypes.func,
  duration: PropTypes.number,
  offset: PropTypes.number,
  queueClass: PropTypes.string,
  queueDuration: PropTypes.number,
};
