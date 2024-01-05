import styled from "styled-components";
import "@fontsource/manrope";

interface CustomButtonProps {
  size: string;
  customButtonType: CustomButtonType;
}
export enum CustomButtonType {
  OUTLINED = "OUTLINED",
  FULFILLED = "FULFILLED",
  GHOST = "GHOST",
  WHITE = "WHITE",
  DISABLED = "DISABLED"
}
export const StyledCustomButton = styled.button<CustomButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    gap: 8px;
    width: ${(props) => {
      switch(props.size) {
        case "SMALL":
          return props.theme.size.small;
        case "MEDIUM":
          return props.theme.size.medium;
        case "LARGE":
          return props.theme.size.large;
        default:
          return props.theme.size.medium;
      }
    }};
    height: 33px;
    left: 16px;
    top: 16px;

    background: ${(props) => {
      switch (props.customButtonType) {
        case "OUTLINED":
          return props.theme.colors.text;
        case "FULFILLED":
          return props.theme.colors.black;
        case "GHOST":
          return props.theme.colors.dark;
        case "WHITE":
          return props.theme.colors.white;
        case "DISABLED":
          return props.theme.colors.gray;
        default:
          return props.theme.colors.main;
      }
    }};
    border-radius: 40px;

    /* Button */
    font-family: ${(props) => props.theme.font.default};
    font-style: normal;
    font-weight: 800;
    font-size: 15px;
    line-height: 110%;

    border: ${(props) =>
      props.customButtonType === "WHITE"
        ? `1px solid ${props.theme.colors.outline}`
        : "none"};

    color: ${(props) => {
      switch (props.customButtonType) {
        case "OUTLINED":
          return props.theme.colors.white;
        case "WHITE":
          return props.theme.colors.black;
        default:
          return props.theme.colors.white;
      }
    }};

    text-align: center;

    cursor: pointer;

    transition: 0.3s;

    &:active {
        transform: scale(0.95);
    }

    &:hover {
        background: ${(props) => {
          switch (props.customButtonType) {
            case CustomButtonType.OUTLINED:
              return props.theme.hover.purple;
            case CustomButtonType.FULFILLED:
              return props.theme.hover.purple;
            case CustomButtonType.GHOST:
              return props.theme.hover.purple;
            case CustomButtonType.WHITE:
              return props.theme.hover.gray;
          }
        }}
`;
export default StyledCustomButton;
