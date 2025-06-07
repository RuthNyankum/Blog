import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router';

const NotFoundPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  console.error('Routing Error:', error);

  return (
    <div className="flex items-center justify-center flex-col text-center h-screen px-4 bg-gray-100">
      <h1 className="text-5xl font-bold text-[#0B394B] mb-4">
        {error.status || 404}
      </h1>
      <h2 className="text-2xl text-gray-800 mb-2">
        {error.statusText || 'Page Not Found'}
      </h2>
      <p className="text-red-700 mb-6">
        {error.message || 'An unknown error occurred'}
      </p>

      <button
        onClick={() => navigate('/', { replace: true })}
        className="mb-4 bg-[#0B394B] text-[#67E8F9] px-6 py-2 rounded cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFoundPage;
