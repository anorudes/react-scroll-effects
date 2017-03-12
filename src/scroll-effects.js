import React from 'react';
import classNames from 'classnames';

let throttle = (delay, callback) => {
  let previousCall = new Date().getTime();
  return () => {
    let time = new Date().getTime();
    if ((time - previousCall) >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
};

export default class ScrollEffect extends React.Component {
    constructor() {
        super();
        this.state = {
            animated: false
        };
        window.addEventListener('scroll', throttle(200, this.handleScroll.bind(this)));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
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
        let element = this.element;
        let checkClass = (el) => {
          return el.className === this.props.queueClass;
        };
        let number = 0;
        let setClass = (el) => {
          el.style.visibility = "hidden";
          setTimeout(() => {
            el.style.visibility = "visible";
            el.className = el.className + ' animated ' + this.props.animate;
          }, number * (this.props.queueDuration * 1000));
          number++;
        };
        let findClass = (element) => {
            Array.prototype.forEach.call(element.childNodes, function(child) {
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
    handleScroll(e) {
        if (!this.state.animated) {
            let element = this.element;
            let elementPositionY = element.getBoundingClientRect().top + document.body.scrollTop,
                scrollPositionY = window.scrollYOffset || window.scrollY,
                windowHeight = window.innerHeight;
            if (scrollPositionY + windowHeight / 2 >= elementPositionY + this.props.offset * 1) {
                this.setState({
                    animated: true
                });
                this.props.queueClass === "" && this.singleAnimate();
                this.props.queueClass !== "" && this.queueAnimate();
            }
        }
    }
    render() {
        const {
          props,
          state 
        } = this;
        let cx = classNames;
        let classes = cx({
            'animated': true,
            [props.animate]: state.animated && props.queueClass === ""
        });
        classes += ' ' + props.className;
        let style = state.animated ? {} : {
            visibility: 'hidden'
        };
        if (props.duration !== '') {
            style.WebkitAnimationDuration = props.duration + 's';
            style.animationDuration = props.duration + 's';
        }
        return <div className={classes} ref={element => this.element = element} style={style}>{ props.children }</div>
    }
}

ScrollEffect.defaultProps = {
    animate: "fadeInUp",
    offset: 0,
    className: "",
    duration: 1,
    queueDuration: 1,
    queueClass: "",
    callback: () => {}
}
