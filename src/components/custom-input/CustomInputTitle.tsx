import styled from "styled-components";

interface CustomInputTitleProps {
    size: string
}

export const StyledCustomInputTitle = styled.label<CustomInputTitleProps>`
    font-family: "Manrope", sans-serif;
    font-size: ${(props) => {
      switch(props.size) {
        case "SMALL":
          return props.theme.size.small/2;
        case "MEDIUM":
          return props.theme.size.medium/2;
        case "LARGE":
          return props.theme.size.large/2;
        default:
          return props.theme.size.medium/2;
      }
    }};
    height: 17px;
    font-weight: 400;
    color: #566370;
    margin-left: 8px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;

    &.active-label {
    color: #4a99e9;
    }

    &.error {
    color: #e03c39;
    }
`;