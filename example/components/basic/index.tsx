import * as React from 'react';

import { Img, resource } from '../../../src';
import { useImages } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Basic = () => {
  const { images, button } = useImages(10);
  return (
    <div className="section">
      <h2>Basic Example</h2>
      <p>
        This is a basic example of loading images with React Suspense and
        Concurrent Mode.
      </p>
      {button}
      <ErrorBoundary>
        <React.SuspenseList revealOrder="forwards">
          {images.map(src => {
            resource.preloadImage(src);

            return (
              <React.Suspense fallback={null} key={src}>
                <Img src={src} width={64} alt="kitten" />
              </React.Suspense>
            );
          })}
        </React.SuspenseList>
      </ErrorBoundary>
    </div>
  );
};

export { Basic };
