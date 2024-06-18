import React from "react";

const NotFound = () => {
  return (
    <div className="bg-[#F4D4B6] min-h-[calc(100vh-72px)] lg:min-h-[calc(100vh-76px)] py-12 grid content-center justify-center">
      <div className="text-center space-y-2">
        <h2 className="font-black-han text-6xl">404 Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
