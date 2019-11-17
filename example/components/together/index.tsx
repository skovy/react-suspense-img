import * as React from 'react';

import { Img, resource } from '../../../src';
import { useImages } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Together = () => {
  const { images, button } = useImages(10);
  return (
    <div className="section">
      <h2>Concurrent Example: Together</h2>
      <p>
        This is an example of loading images with a <code>revealOrder</code> of{' '}
        <code>together</code> with the same <code>fallback</code> as above.
      </p>
      <p>
        Notice when they are reloaded that the images are revealed all at once.
        They are no revealed randomly or one-by-one in a certain direction.
      </p>
      {button}
      <ErrorBoundary>
        <React.SuspenseList revealOrder="together">
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

export { Together };
