import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Basic } from './components/basic';
import { Backwards } from './components/backwards';
import { Together } from './components/together';
import { Legacy } from './components/legacy';

const App = () => (
  <div className="main-content">
    <h1>react-suspense-img</h1>
    <p>
      The following are various examples of using a simple React image component
      that suspends while loading to work with React concurrent mode. For more
      details on usage and the full API{' '}
      <a href="https://github.com/skovy/react-suspense-img">
        please visit the README
      </a>
      .
    </p>
    <p>
      If you're on a fast network connection it may be ideal to throttle your
      network speed to make the differences between the following examples more
      pronounced.
    </p>
    <p>
      All of this code is available in the <code>example</code> directory{' '}
      <a href="https://github.com/skovy/react-suspense-img/tree/master/example">
        in the GitHub repository
      </a>
      .
    </p>
    <Legacy />
    <Basic />
    <Together />
    <Backwards />
  </div>
);

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(<App />);
