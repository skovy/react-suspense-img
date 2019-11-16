import * as React from 'react';

import { resource } from '../resource';

type StandardImageProps = JSX.IntrinsicElements['img'];

interface Props extends StandardImageProps {
  src: string;
}

/**
 * Renders an image. If the image has not loaded yet it will suspend. If there
 * is an error while the image loads it will throw.
 *
 * @param props standard image attributes
 */
const Img = (props: Props) => {
  const { src, alt, ...rest } = props;

  const loadedSrc = resource.read(src);

  return <img {...rest} alt={alt} src={loadedSrc} />;
};

export { Img };
