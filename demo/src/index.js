import React from 'react/addons';
import ScrollEffect from 'react-scroll-effects';

class App {
  callbackAnimateElement4() {  /* example callback for 3 element */
    alert('callback animate of 4 element');
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
          <ScrollEffect animate="zoomInUp" queueClass="queue" duration="2" queueDuration=".5"> { /* full */ }
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
        </section>
        <section>
          <ScrollEffect className="element" animate="bounceInUp" callback={this.callbackAnimateElement4.bind(this)}> { /* callback */ }
            <span>4</span>
          </ScrollEffect>
        </section>
        <section>
          <ScrollEffect className="element" animate="fadeInUp" offset="-500"> { /* zoomInUp with offset */ }
            <span>5</span>
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