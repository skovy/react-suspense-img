import * as React from 'react';

import { Img, resource } from '../../../src';
import { fetchUser } from '../../utils';
import { ErrorBoundary } from '../error-boundary';

const Fallback = () => (
  <div className="example__card">
    <div className="example__avatar--loading" />
    <div className="example__input--loading" />
  </div>
);

const UserInput = ({ userResource }: any) => {
  const user = userResource.read();

  return (
    <div className="example__card">
      <Img src={user.avatarUrl} className="example__avatar" />

      <input
        type="text"
        className="example__input"
        placeholder={`What's on your mind ${user.name}?`}
      />
    </div>
  );
};

const SuspenseImg = () => {
  const [userResource, setUserResource] = React.useState(fetchUser());
  const [startTransition] = React.useTransition();
  const reload = () =>
    startTransition(() => {
      setUserResource(fetchUser());
    });

  return (
    <div className="section">
      <h2>Suspense Image Component</h2>
      <p>
        This example is identical to the previous example except it's now using
        the <code>Img</code> component instead of the standard <code>img</code>{' '}
        element.
      </p>
      <p>
        Notice how the component continues to suspend and show the fallback
        while the image is still loading. This results in showing the fallback
        for longer but when it does render there is no flash of content because
        the image has fully loaded.
      </p>
      <button onClick={reload} className="reload-button">
        Reload Prompt
      </button>
      <ErrorBoundary>
        <React.Suspense fallback={<Fallback />}>
          <UserInput userResource={userResource} />
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
};

export { SuspenseImg };
