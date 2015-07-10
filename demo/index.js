import React from 'react/addons';
import ScrollEffect from '../src/scroll-effect';

class App {
  render() {
    return (
      <div>
        <section>
          <div className="bottom">
            <ScrollEffect name="fadeInUp"> { /* fadeInUp */ }
              <div className="element">1</div>
            </ScrollEffect>
          </div>
        </section>
        <section>
          <div className="bottom">
            <ScrollEffect name="slideInRight"> { /* slideInRight */ }
              <div className="element">2</div>
            </ScrollEffect>
          </div>
        </section>
        <section>
          <div className="bottom">
            <ScrollEffect name="bounceInUp"> { /* bounceInUp */ }
              <div className="element">3</div>
            </ScrollEffect>
          </div>
        </section>
        <section>
          <div className="bottom">
            <ScrollEffect name="fadeInUp" offset="-500"> { /* zoomInUp with offset */ }
              <div className="element">4</div>
            </ScrollEffect>
          </div>
        </section>
      </div>
    );
  }
}

React.render(
  <App />,
  document.getElementById('app')
);

