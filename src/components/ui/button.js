import React from "react";

export function Button({ children, onClick }) {
  return (
    <button className="p-2 bg-blue-500 text-white rounded" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
