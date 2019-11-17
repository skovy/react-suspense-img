import * as React from 'react';

import { useImages } from '../../utils';

const Legacy = () => {
  const { images, button } = useImages(10);

  return (
    <div className="section">
      <h2>Legacy Example</h2>
      <p>
        This is a "legacy" (traditional) example of loading images without React
        Suspense and Concurrent Mode.
      </p>
      <p>
        Notice when they are reloaded that they will pop in randomly.
      </p>
      {button}
      {images.map(src => (
        <img src={src} height={64} width={64} key={src} alt="kitten" />
      ))}
    </div>
  );
};

export { Legacy };
