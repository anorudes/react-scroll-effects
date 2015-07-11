import React from 'react/addons';

export default class ScrollEffect extends React.Component {
    constructor() {
        super();
        this.state = {
            animated: false
        };
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
    singleAnimate() {
        this.setState({
            animated: true
        });
        setTimeout(() => {
            this.props.callback();
        }, this.props.duration * 1000);
    }
    queueAnimate() {
        let element = React.findDOMNode(this);
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
        Array.prototype.forEach.call(element.childNodes, function(child) {
            Array.prototype.forEach.call(child.childNodes, function(ch) {
              if (checkClass(ch)) {
                setClass(ch);
              }
            });
            if (checkClass(child)) {
              setClass(child);
            }
        });
    }
    handleScroll(e) {
        let element = React.findDOMNode(this);

        let elementPositionY = element.getBoundingClientRect().top + document.body.scrollTop,
            scrollPositionY = window.scrollY,
            windowHeight = window.innerHeight;
        if (scrollPositionY + windowHeight / 2 >= elementPositionY + this.props.offset * 1) {
            if (!this.state.animated) {
                this.setState({
                    animated: true
                });
                this.props.queueClass == "" && this.singleAnimate();
                this.props.queueClass !== "" && this.queueAnimate();
            }
        }
    }
    render() {
        const {
            props, state
        } = this;
        let cx = React.addons.classSet;
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
        return <div className = {
            classes
        }
        style = {
            style
        } > {
            props.children
        } < /div>
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
