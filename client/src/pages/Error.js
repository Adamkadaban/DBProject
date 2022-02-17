import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="w-screen h-screen mx-auto flex flex-col items-center justify-center">
      <h1 className="text-6xl text-center pb-8">404 | Not Found</h1>
      <Link
        to="/"
        className="bg-blue-800 rounded-md text-white font-semibold p-2"
      >
        Back Home
      </Link>
    </div>
  );
};
