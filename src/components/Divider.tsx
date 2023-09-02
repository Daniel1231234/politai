import React from "react";

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className }) => {
  return <div className={`w-full border border-gray-200 ${className}`} />;
};

export default Divider;
