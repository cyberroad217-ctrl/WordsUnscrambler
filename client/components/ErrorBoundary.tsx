import { Component, ReactNode, ErrorInfo } from "react";
import { AlertCircle, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("❌ Error caught by boundary:", error);
    console.error("❌ Error details:", errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
              Something Went Wrong
            </h1>
            <p className="text-slate-600 text-center mb-6">
              We encountered an unexpected error. Don't worry, we've logged the details to help us fix it.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mb-6 p-4 bg-slate-100 rounded-lg max-h-48 overflow-auto font-mono text-xs text-slate-700 border-l-4 border-red-600">
                <p className="font-bold mb-2">Error Details:</p>
                <p className="break-words">{this.state.error.message}</p>
                {this.state.errorInfo && (
                  <>
                    <p className="font-bold mt-2 mb-2">Stack Trace:</p>
                    <pre className="whitespace-pre-wrap break-words">{this.state.errorInfo.componentStack}</pre>
                  </>
                )}
              </div>
            )}

            <button
              onClick={this.handleReset}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Home className="w-5 h-5" />
              Go Back Home
            </button>

            <button
              onClick={() => {
                window.location.href = "/login";
              }}
              className="w-full border-2 border-slate-300 text-slate-700 font-bold py-3 px-4 rounded-lg hover:bg-slate-50 transition-all"
            >
              Try Logging In
            </button>

            <p className="text-center text-xs text-slate-500 mt-4">
              If this problem persists, please contact support with this reference:
            </p>
            <p className="text-center text-xs font-mono text-slate-600 mt-1">
              {new Date().toISOString()}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
