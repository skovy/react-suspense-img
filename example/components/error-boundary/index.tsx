import * as React from 'react';

interface Props {}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p className="error">
          An error occurred loading the images. Please check your console for
          more details.
        </p>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
