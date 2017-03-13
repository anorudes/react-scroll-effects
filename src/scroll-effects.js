import React, { Component, PropTypes } from 'react';
import throttle from 'lodash.throttle';
import classNames from 'classnames';

// const throttle = (callback, delay) => {
//   let previousCall = new Date().getTime();
//   return () => {
//     const time = new Date().getTime();
//     if ((time - previousCall) >= delay) {
//       previousCall = time;
//       callback(...arguments);
//     }
//   };
// };
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
    if (window) {
      window.addEventListener('scroll', throttle(this.handleScroll.bind(this), 200));
    }
  }

  componentDidMount() {
    this.handleScroll();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }


  singleAnimate() {
    this.setState({
      animated: true
    });
    /* callback */
    setTimeout(() => {
      this.props.callback();
    }, this.props.duration * 1000);
  }

  queueAnimate() {
    const element = this.node;
    const checkClass = el =>
      el.className === this.props.queueClass;
    let number = 0;
    const setClass = (el) => {
      const myElement = el;
      myElement.style.visibility = 'hidden';
      setTimeout(() => {
        myElement.style.visibility = 'visible';
        myElement.className = `${myElement.className} animated ${this.props.animate}`;
      }, number * (this.props.queueDuration * 1000));
      number += 1;
    };
    const findClass = () => {
      Array.prototype.forEach.call(element.childNodes, (child) => {
        findClass(child);
        if (checkClass(child)) {
          setClass(child);
        }
      });
    };
    /* find queue classes */
    findClass(element);

    /* callback */
    setTimeout(() => {
      this.props.callback();
    }, this.props.duration * 1000 * number);
  }

  handleScroll() {
    if (!this.state.animated) {
      const element = this.node;
      console.log(element);
      const top = ScrollEffect.posTop();
      console.log('top: ', top);
      const elementPositionY = element.getBoundingClientRect().top + top;
      console.log('element top: ', element.getBoundingClientRect().top);
      console.log('scrollTop: ', document.body.scrollTop);
      console.log(elementPositionY);
      const scrollPositionY = window.scrollY ? window.scrollY : window.pageYOffset;
      const windowHeight = window.innerHeight;
      console.log(windowHeight);
      if (scrollPositionY + (windowHeight) >= elementPositionY + (this.props.offset * 1)) {
        this.setState({
          animated: true
        });
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
        style={style}
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
