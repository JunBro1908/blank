import React from "react";

export function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="p-2 border rounded w-full"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
