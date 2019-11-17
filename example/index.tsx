import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Basic } from './components/basic';
import { Backwards } from './components/backwards';
import { Legacy } from './components/legacy';
import { NormalImg } from './components/normal-img';
import { SuspenseImg } from './components/suspense-img';
import { Transition } from './components/transition';
import { Together } from './components/together';

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
      pronounced. In Chrome, open the developer tools, go to the "Network" tab
      and select "Slow 3G."
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
    <Backwards />
    <Together />
    <Transition />
    <NormalImg />
    <SuspenseImg />
    <a
      href="https://github.com/skovy/react-suspense-img"
      className="github-corner"
      aria-label="View source on GitHub"
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 250 250"
        className="github-svg"
        aria-hidden="true"
      >
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          className="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          className="octo-body"
        ></path>
      </svg>
    </a>
  </div>
);

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(<App />);
