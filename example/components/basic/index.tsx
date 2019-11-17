import * as React from 'react';

import { Img, resource } from '../../../src';
import { useImages } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Basic = () => {
  const { images, button } = useImages(10);
  return (
    <div className="section">
      <h2>Suspense List Example: Forwards</h2>
      <p>
        This is a basic example of loading images with React Suspense and
        Concurrent Mode. Each <code>Img</code> component is wrapped in its own{' '}
        <code>React.Suspense</code> with its own <code>fallback</code>. This
        entire list is then wrapped in <code>React.SuspenseList</code> with a{' '}
        <code>revealOrder</code> of <code>forwards</code> and a{' '}
        <code>tail</code> value of <code>collapsed</code>.
      </p>
      <p>
        Notice when they are reloaded that the images are revealed forwards (not
        randomly or in any other order) and only one fallback indicator is shown
        at a time and the rest are "collapsed."
      </p>
      {button}
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards" tail="collapsed">
          {images.map(src => {
            resource.preloadImage(src);

            return (
              <React.Suspense
                fallback={<div className="image-fallback" />}
                key={src}
              >
                <Img src={src} width={64} height={64} alt="kitten" />
              </React.Suspense>
            );
          })}
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  );
};

export { Basic };
