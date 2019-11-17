import * as React from 'react';

import { Img, resource } from '../../../src';
import { useImages } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Transition = () => {
  const { images, button } = useImages(10);

  return (
    <div className="section">
      <h2>Single Suspense Example: Transition</h2>
      <p>
        This is an example of loading images with a single top-level{' '}
        <code>Suspense</code> component. It will show the fallback while any one
        of the images is still loading so it behaves in a similar way to the{' '}
        <code>SuspenseList</code> with a <code>revealOrder</code> of{' '}
        <code>together</code>. However, the refresh button is also using the{' '}
        <code>useTransition</code> hook with a timeout of <code>2000</code>{' '}
        milliseconds. For the first 2 seconds the button will say it's
        "Reloading..." and after 2 seconds the top-level suspense{' '}
        <code>fallback</code> will be rendered.
      </p>
      <p>
        If you're on a fast connection, you will likely never see the top-level{' '}
        <code>fallback</code> if all the images load in less than 2 seconds.
      </p>
      {button}
      <ErrorBoundary>
        <React.Suspense
          fallback={
            <div className="all-images-fallback">
              <span>Loading Images...</span>
            </div>
          }
        >
          {images.map(src => {
            resource.preloadImage(src);

            return (
              <Img key={src} src={src} width={64} height={64} alt="kitten" />
            );
          })}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export { Transition };
