import React from 'react';
import ScrollEffect from 'react-scroll-effects';

class App {
  callbackAnimateElement3() {  /* example callback for 3 element */
    alert('callback animate of 3 element');
  }
  render() {
    return (
      <div>
        <section>
          <ScrollEffect className="element" animate="fadeInUp"> { /* fadeInUp */ }
            <span>1</span>
          </ScrollEffect>
        </section>
        <section>
          <ScrollEffect className="element test" animate="slideInRight" duration="3"> { /* slideInRight, custom duration, 2 classes */ }
            <span>2</span>
          </ScrollEffect>
        </section>
        <section>
          <ScrollEffect className="element" animate="bounceInUp" callback={this.callbackAnimateElement3.bind(this)}> { /* bounceInUp */ }
            <span>3</span>
          </ScrollEffect>
        </section>
        <section>
          <ScrollEffect className="element" animate="fadeInUp" offset="-500"> { /* zoomInUp with offset */ }
            <span>4</span>
          </ScrollEffect>
        </section>
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);