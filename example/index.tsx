import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Img, resource } from '../src';

const RANDOM_IMAGES: string[] = [];

for (let i = 200; i < 250; i++) {
  RANDOM_IMAGES.push(`https://placekitten.com/${i}/200`);
}

const App = () => {
  return (
    <div>
      <React.SuspenseList revealOrder="forwards">
        {RANDOM_IMAGES.map(src => {
          resource.preloadImage(src);

          return (
            <React.Suspense fallback={null} key={src}>
              <Img src={src} width={64} />
            </React.Suspense>
          );
        })}
      </React.SuspenseList>
    </div>
  );
};

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(<App />);
