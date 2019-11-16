**️⚠️ Please note this package relies on experimental React features that are not yet available in a stable release. By definition, this means this package is also experimental. See [the React documentation on current mode for more details](https://reactjs.org/docs/concurrent-mode-intro.html).**

# 🖼 react-suspense-img

A simple React image component that suspends while loading.

## Usage

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

## Credit

- Built with [TSDX](https://github.com/jaredpalmer/tsdx).
- Inspired by [`relay-experimental`](https://github.com/facebook/relay/tree/b9d272d58a7101a955e951c735034d39669b40b7/packages/relay-experimental).
- Inspired by [`suspense-experimental-github-demo`](https://github.com/gaearon/suspense-experimental-github-demo).
