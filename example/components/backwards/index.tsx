import * as React from 'react';

import { Img, resource } from '../../../src';
import { useImages } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Backwards = () => {
  const { images, button } = useImages(10);

  React.useEffect(() => {
    // This is a semi-hack. Since we're rendering images backwards we want to
    // prioritize loading the last images first.
    images.reverse().forEach(src => resource.preloadImage(src));
  }, [images]);

  return (
    <div className="section">
      <h2>Suspense List Example: Backwards</h2>
      <p>
        This is an example of loading images with a <code>revealOrder</code> of{' '}
        <code>backwards</code>.
      </p>
      <p>
        Notice when they are reloaded that the images are revealed one-by-one.
        But this time the last element is loaded first, then the second to last,
        etc. In this case, this will effectively be right-to-left.
      </p>
      {button}
      <ErrorBoundary>
        <React.SuspenseList revealOrder="backwards">
          {images.map(src => {
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

export { Backwards };
