import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { Img, resource } from '../../src';

jest.mock('scheduler', () => require('scheduler/unstable_mock'));

interface Props {
  callback: (error: Error) => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.props.callback(error);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

describe('<Img />', () => {
  let container: HTMLElement;
  let root: ReactDOM.Root;
  let onload: () => void;
  let onerror: () => void;

  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'src', {
      set() {
        onload = () => this.onload();
        onerror = () => this.onerror();
      },
    });
  });

  beforeEach(() => {
    container = document.createElement('div');
    root = ReactDOM.createRoot(container);

    // Clear-out the image cache to start each test with a clean slate.
    resource.clear();
  });

  afterEach(() => {
    root.unmount();
  });

  it('suspends while loading the image', async () => {
    await act(async () =>
      root.render(
        <React.Suspense fallback={'Loading...'}>
          <Img src="https://placekitten.com/12/34" />
        </React.Suspense>
      )
    );

    expect(container.textContent).toBe('Loading...');

    await act(async () => onload());

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('throws an error if there was an issue loading the image', async () => {
    // Intentionally silencing verbose error messages from React, ReactDOM, etc.
    // since we're intentionally triggering an error.
    jest.spyOn(console, 'error').mockImplementation(() => {});

    const callback = jest.fn();

    await act(async () =>
      root.render(
        <ErrorBoundary callback={callback}>
          <React.Suspense fallback={'Loading...'}>
            <Img src="https://placekitten.com/12/34" />
          </React.Suspense>
        </ErrorBoundary>
      )
    );

    await act(async () => onerror());

    expect(container.innerHTML).toMatchSnapshot();
    expect(callback).toHaveBeenCalledWith(
      Error(
        `An error occurred loading the image: "https://placekitten.com/12/34"`
      )
    );
  });

  it('passes through all standard image attributes', async () => {
    await act(async () =>
      root.render(
        <React.Suspense fallback={'Loading...'}>
          <Img
            src="https://placekitten.com/12/34"
            alt="kitten"
            width={64}
            title="A kitten"
          />
        </React.Suspense>
      )
    );
    await act(async () => onload());

    expect(container.innerHTML).toMatchSnapshot();
  });
});
