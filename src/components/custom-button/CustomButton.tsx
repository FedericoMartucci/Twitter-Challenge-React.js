import { MouseEventHandler } from "react";
import { CustomButtonType, StyledCustomButton } from "./StyledCustomButton";
import { ReactComponent as SendIcon } from "../../assets/send.svg";

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
      customButtonType={disabled ? CustomButtonType.DISABLED : customButtonType}
      disabled={customButtonType === "DISABLED" || (disabled ? disabled : false)}
      onClick={onClick}
    >
      {text === 'send-message'? <SendIcon/> : text}
    </StyledCustomButton>
  );
};

export default CustomButton;
