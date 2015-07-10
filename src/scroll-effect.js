import React from 'react/addons';

export default class ScrollEffect extends React.Component {
  static defaultProps = {
    name: "fadeInUp",
    offset: 0
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
    elementPositionY = $(element).offset().top;
    if (scrollPositionY + windowHeight / 2 >= elementPositionY + this.props.offset*1) {
      if (!this.state.animated) {
        this.setState({animated: true});
      }
    }
  }
  render() {
    let cx = React.addons.classSet;
    let classes = cx({
      'animated': true,
      [this.props.name]: this.state.animated
    });
    let style = this.state.animated ? { } : { visibility: 'hidden' };
    return <div className={classes} style={style}>{this.props.children}</div>
  }
}