import React from 'react/addons';

export default class ScrollEffect extends React.Component {
  static defaultProps = {
    animate: "fadeInUp",
    offset: 0,
    className: "",
    duration: 1,
    callback: () => { }
  }
  constructor() {
    super();
    this.state = { animated: false };
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
  handleScroll(e) {
    let element = React.findDOMNode(this);

    let elementPositionY = element.getBoundingClientRect().top + document.body.scrollTop,
        scrollPositionY = window.scrollY,
        windowHeight = window.innerHeight;
    if (scrollPositionY + windowHeight / 2 >= elementPositionY + this.props.offset*1) {
      if (!this.state.animated) {
        this.setState({animated: true});
        setTimeout(() => {
          this.props.callback();
        }, this.props.duration * 1000)
      }
    }
  }
  render() {
    const {props, state} = this;
    let cx = React.addons.classSet;
    let classes = cx({
      'animated': true,
      [props.animate]: state.animated
    });
    let customClasses = props.className.split(' ');
    for (let customClass of customClasses) {
        classes += ' ' + customClass;
    }
    let style = state.animated ? { } : { visibility: 'hidden' };
    if (props.duration !== '') {
      style.WebkitAnimationDuration = props.duration+'s';
      style.animationDuration = props.duration+'s';
    }
    return <div className={classes} style={style}>{props.children}</div>
  }
}