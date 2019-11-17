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
      <img src={user.avatarUrl} className="example__avatar" />

      <input
        type="text"
        className="example__input"
        placeholder={`What's on your mind ${user.name}?`}
      />
    </div>
  );
};

const NormalImg = () => {
  const [userResource, setUserResource] = React.useState(fetchUser());
  const [startTransition] = React.useTransition();
  const reload = () =>
    startTransition(() => {
      setUserResource(fetchUser());
    });

  return (
    <div className="section">
      <h2>Normal Image Element</h2>
      <p>
        This is an example of a potential user input prompt. First, it loads the
        user's data (their name and avatar). While the data loads the component
        suspends so the fallback is rendered. Once this data loads it renders an{' '}
        <code>img</code> component with the avatar.
      </p>
      <p>
        Notice once the prompt loads there is a slight delay until the image
        loads (depending on your network speed). This is because we are not
        explicitly suspending while this image loads.
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

export { NormalImg };
