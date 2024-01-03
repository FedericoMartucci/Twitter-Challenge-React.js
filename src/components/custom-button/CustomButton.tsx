import { MouseEventHandler } from "react";
import { CustomButtonType, StyledCustomButton } from "./StyledCustomButton";

interface CustomButtonProps {
  text: string;
  size: string;
  customButtonType: CustomButtonType;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type?: string;
}
const CustomButton = ({ text, size, customButtonType, onClick, disabled }: CustomButtonProps) => {
  return (
    <StyledCustomButton
      size={size}
      customButtonType={disabled ? CustomButtonType.OUTLINED : customButtonType}
      disabled={customButtonType === "OUTLINED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text}
    </StyledCustomButton>
  );
};

export default CustomButton;
