![npm version](https://img.shields.io/npm/v/react-suspense-img)
[![Build Status](https://travis-ci.org/skovy/react-suspense-img.svg?branch=master)](https://travis-ci.org/skovy/react-suspense-img)

**️⚠️ Please note this package relies on experimental React features that are not yet available in a stable release. By definition, this means this package is also experimental. See [the React documentation on current mode for more details](https://reactjs.org/docs/concurrent-mode-intro.html).**

# 🖼 react-suspense-img

A simple React image component that suspends while loading.

## Usage

Install the package.

```bash
yarn add react-suspense-img
```

Import the `Img` component and image `resource` cache.

```tsx
import { Img, resource } from 'react-suspense-img';
```

Use the `Img` component as you would a standard `img` element. However, ensure to wrap it (at the desired place in the tree) with a `ErrorBoundary` and `React.Suspense`. The `Img` component will suspend (while loading) or throw an error (if an error occurred loading the image).

```tsx
// Start fetching early, following the render-as-you-fetch pattern.
resource.preloadImage('https://placekitten.com/12/34');

const Component = () => (
  <ErrorBoundary>
    <React.Suspense fallback="Loading...">
      <Img src="https://placekitten.com/12/34" width={64} alt="Kitten" />
    </React.Suspense>
  </ErrorBoundary>
);
```

Want to see examples of what this could look like? See some of
[the examples here](https://react-suspense-img.netlify.com/).

## API

### `<Img />`

A small component that wraps `img` but suspends while the image is loading.

#### Props

- `src`: the only required prop, the image source to display.
- `...`: all of the standard image props, for example `alt`, `className`, etc.

### `resource`

The image resource to cache images and determine if a given image has loaded
or if it needs to suspend.

#### Methods

- `preloadImage(src: string)`: preload the given source image. This is the only
  method that is necessary to use. This should be called before using the given
  `src` with the `Img` component to follow the
  [render-as-you-fetch pattern](https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense).
- `read(src: string)`: read a given source from the cache. If it has not loaded
  it will throw a promise. If it has errored it will throw an error. If it has
  loaded it will return the source. This method is used within the `Img`
  component and should never need to be called directly.
- `clear()`: clear the entire image resource cache. This may be useful for
  running between tests to always start with an empty cache.

## Credit

- Built with [TSDX](https://github.com/jaredpalmer/tsdx).
- Inspired by [`relay-experimental`](https://github.com/facebook/relay/tree/b9d272d58a7101a955e951c735034d39669b40b7/packages/relay-experimental).
- Inspired by [`suspense-experimental-github-demo`](https://github.com/gaearon/suspense-experimental-github-demo).
