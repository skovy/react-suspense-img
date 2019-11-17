import * as React from 'react';

/**
 * Generate a given number of images. Each time it's called the timestamp is
 * appended to avoid hitting the browser cache.
 *
 * @param count the total count of images to generate
 */
const generateRandomImages = (count: number): string[] => {
  const now = Date.now();
  const randomImages: string[] = [];

  for (let i = 200; i < 200 + count; i++) {
    randomImages.push(`https://placekitten.com/${i}/200?timestamp=${now}`);
  }

  return randomImages;
};

/**
 * Generate a given number of images. Returns an object that contains an array
 * of `images` and a `button` that can be rendered to refresh (reload) all of
 * the images to simulate refreshing the page.
 *
 * @param count the total count of images to generate
 */
const useImages = (count: number) => {
  const [images, setImages] = React.useState(generateRandomImages(count));
  const [startTransition, isPending] = React.useTransition({
    timeoutMs: 2000,
  });

  const reload = () => {
    startTransition(() => {
      setImages(generateRandomImages(count));
    });
  };

  const button = (
    <button onClick={reload} className="reload-button" disabled={isPending}>
      {isPending ? 'Reloading...' : 'Reload Images'}
    </button>
  );

  return { images, button };
};

export { useImages };
