import { InputHTMLAttributes } from "react";

export type CustomButtonProps = {
    text?: string; // Text to display on the button
    onClick?: () => void; // Click handler
    disabled?: boolean; // Disable state
    type?: "button" | "submit" | "reset"; // Button type
    className?: string; // Custom class for styling
    iconLeft?: React.ReactNode; // Icon component to display on the left
    iconRight?: React.ReactNode; // Icon component to display on the right
    style?: React.CSSProperties; // Inline styles
  };

export type CustomInputProps = {
    label?: string; // Optional label for the input
    type?: InputHTMLAttributes<HTMLInputElement>["type"]; // Input type (text, password, email, etc.)
    placeholder?: string; // Placeholder text
    value?: string; // Value of the input
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
    onFocus?: () => void; // Focus handler
    onBlur?: () => void; // Blur handler
    error?: string; // Error message
    className?: string; // Custom class for styling
    style?: React.CSSProperties; // Inline styles
    disabled?: boolean; // Disabled state
    iconLeft?: React.ReactNode; // Icon to display on the left
    iconRight?: React.ReactNode; // Icon to display on the right
    accept?: string;
  };

export type CustomTextProps = {
    children: React.ReactNode; // The text or content to display
    as?: "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"; // HTML tag to render
    className?: string; // Custom classes for styling
    style?: React.CSSProperties; // Inline styles
    color?: string; // Text color
    fontSize?: string; // Font size
    fontWeight?: string | number; // Font weight
    textAlign?: "left" | "center" | "right" | "justify"; // Text alignment
    lineHeight?: string | number; // Line height
    isTruncated?: boolean; // Whether the text should be truncated with ellipsis
    title?: string; // Tooltip for truncated text
  };

  type DatasetItem = {
    _id: string;       // Unique identifier for the record
    Day: string;       // Date or day value (numeric format)
    Age: string;       // Age range as a string (e.g., '15-25')
    Gender: string;    // Gender as a string (e.g., 'Male', 'Female')
    A: number;         // Value for field A (numeric)
    B: number;         // Value for field B (numeric)
    C: number;         // Value for field C (numeric)
    D: number;         // Value for field D (numeric)
    E: number;         // Value for field E (numeric)
    F: number;         // Value for field F (numeric)
  };
  
  // Declare an array of DatasetItem objects
  export type Dataset = DatasetItem[];


  
  
