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

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
const wrapPromise = (promise: Promise<{}>) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

const NAMES = ['Jill', 'James', 'Jane', 'Joe'];
let index = 0;

const fetchUser = () => {
  index = index % NAMES.length;

  return wrapPromise(
    new Promise(resolve => {
      setTimeout(() => {
        // Pick a random width between 100 and 200 for a variety of kittens.
        const width = Math.floor(Math.random() * 100 + 100);

        resolve({
          name: NAMES[index++],
          avatarUrl: `https://placekitten.com/${width}/200?timestamp=${Date.now()}`,
        });
      }, 2000);
    })
  );
};

export { useImages, fetchUser };
