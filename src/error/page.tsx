import type React from "react";
import { Link } from "react-router";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Error</h1>
        <p className="text-center mb-4">
          An error occurred during authentication.
        </p>
        <Link
          to="/"
          className="block text-center text-blue-500 hover:underline"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
