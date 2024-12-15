import React from "react";
import { CustomInputProps } from "../../types/types";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  className = "",
  style,
  disabled = false,
  iconLeft,
  iconRight,
  accept
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className={`relative flex items-center`}>
        {iconLeft && <span className="absolute left-3">{iconLeft}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          accept={accept}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
            disabled
              ? "bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          } ${iconLeft ? "pl-10" : ""} ${
            iconRight ? "pr-10" : ""
          } ${className}`}
          style={style}
        />
        {iconRight && <span className="absolute right-3">{iconRight}</span>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
