import React from "react";
import { CustomTextProps } from "../../types/types";



const CustomText: React.FC<CustomTextProps> = ({
  children,
  as: Tag = "p",
  className = "",
  style,
  color = "inherit",
  fontSize = "inherit",
  fontWeight = "normal",
  textAlign = "left",
  lineHeight = "normal",
  isTruncated = false,
  title = "",
}) => {
  return (
    <Tag
      className={`${
        isTruncated ? "truncate" : ""
      } ${className}`}
      style={{
        color,
        fontSize,
        fontWeight,
        textAlign,
        lineHeight,
        ...style,
      }}
      title={isTruncated ? title || (typeof children === "string" ? children : "") : undefined}
    >
      {children}
    </Tag>
  );
};

export default CustomText;
