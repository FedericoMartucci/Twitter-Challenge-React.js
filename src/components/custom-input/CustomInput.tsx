import { ChangeEvent, useRef, useState } from "react";
import { StyledInputContainer } from "../labeled-input/InputContainer";
import { CustomInputType, StyledCustomInput } from "./StyledCustomInput";
import { StyledCustomInputTitle } from "./CustomInputTitle";

interface CustomInputProps {
  value?: string;
  type?: "password" | "text";
  title: string;
  placeholder: string;
  required: boolean;
  error?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  size?: string;
}

const CustomInput = ({
  value = '',
  title,
  placeholder,
  required,
  error,
  onChange,
  type = "text",
  size = "SMALL",
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <StyledInputContainer
      className={`${error ? "error" : ""}`}
      onClick={handleClick}
    >
      <StyledCustomInputTitle
        className={`${focus ? "active-label" : ""} ${error ? "error" : ""}`}
        size={size}
      >
        {title}
      </StyledCustomInputTitle>
      <StyledCustomInput
        customInputType={CustomInputType.FULFILLED}
        value={value}
        type={type}
        required={required}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        className={error ? "error" : ""}
        ref={inputRef}
      />
    </StyledInputContainer>
  );
};

export default CustomInput;
