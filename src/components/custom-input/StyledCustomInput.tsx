import styled from "styled-components";

interface CustomInputProps {
    customInputType: CustomInputType;
}
export enum CustomInputType {
    OUTLINED = "OUTLINED",
    FULFILLED = "FULFILLED",
    GHOST = "GHOST",
    WHITE = "WHITE",
}

export const StyledCustomInput = styled.input<CustomInputProps>`
  font-size: 16px;
  border: none;
  outline: none;
  background: none;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;