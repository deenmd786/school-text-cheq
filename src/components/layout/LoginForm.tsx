// LoginForm.tsx
import React from 'react';
import Logo from '../ui/Logo';

const LoginForm: React.FC = () => {
  return (
    <div className="flex items-center px-4 justify-center min-h-screen bg-gray-100">
      <div className="bg-green-700 bg-opacity-70 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl p-8 w-80 relative">
        <div className="absolute  rounded-full w-28 h-28 overflow-hidden -top-12 left-1/2 transform -translate-x-1/2">
        <Logo/>
        </div>
        <div className="mt-16">
          <div className="mb-4">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="username">
              Username / Email
            </label>
            <input
              className="appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-gray-500"
              id="username"
              placeholder="Username / Email"
              type="text"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border-b-2 border-gray-300 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-gray-500"
              id="password"
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-gray-200">
              <input className="mr-2 leading-tight" type="checkbox" />
              <span className="text-sm">Remember</span>
            </label>
            <a className="inline-block align-baseline font-bold text-sm text-gray-200 hover:text-gray-400" href="#">
              Forget Password?
            </a>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-white text-green-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;