import { ReactNode, Component } from "react";
import { Navigate } from "react-router";

type PrivateErrorBoundaryProps = {
  children: ReactNode;
};

type PrivateErrorBoundaryState = {
  hasError: boolean;
};

export class PrivateErrorBoundary extends Component<
  PrivateErrorBoundaryProps,
  PrivateErrorBoundaryState
> {
  constructor(props: PrivateErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Navigate to="/" replace />;
    }
    return this.props.children;
  }
}
