import React from "react";
import { BsGithub } from "react-icons/bs";

interface AppFooterProps {}

const AppFooter: React.FC<AppFooterProps> = ({}) => {
  return (
    <div className="mx-auto flex flex-col gap-1 items-center justify-center border-t-2">
      <span className="text-gray-800 text-sm font-medium">
        <span className="text-red-500">build with ❤️</span> by Daniel Shalem
      </span>
      <a
        href="https://www.danielshalem.com"
        className="text-gray-800 text-sm ml-4 font-medium underline"
      >
        www.danielshalem.com
      </a>
      <a href="https://github.com/Daniel1231234" className="ml-4">
        <BsGithub className="w-6 h-6 text-gray-800" />
      </a>
    </div>
  );
};

export default AppFooter;
