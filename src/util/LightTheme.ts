export const LightTheme: Partial<Theme> = {
  background: "#fff",
  colors: {
    main: "#4A99E9",
    light: "#A5CCF4",
    dark: "#428AD2",
    error: "#E03C39",
    white: "#FFFFFF",
    gray: "#DDDDDD",
    darkgray: "#999999",
    inactiveBackground: "#F0F3F4",
    containerLine: "#F0F3F4",
    hover: "#E7E7E8",
    chat: "#EDF0F1",
    outline: "#D1D9DD",
    text: "#566370",
    black: "#000000",
    errorContainer: "#E5397F",
  },
  hover: {
    default: "#428AD2",
    follow: "#428AD2",
    error: "#FF0000",
    outlined: "#f3f3f3",
    disabled: "#A5CCF4",
    gray: "#DDDDDD",
    purple: "#8888FF"
  },
  text: {
    default: "#566370",
    title: "#000000",
    error: "#E03C39",
  },
  font: {
    default: "Manrope",
    title: "Inter",
  },
  size: {
    small: "32px",
    medium: "64px",
    large: "128px",
  },
};

export type Theme = {
  background: string;
  colors: {
    main: string;
    light: string;
    dark: string;
    error: string;
    white: string;
    gray: string;
    darkgray: string;
    inactiveBackground: string;
    containerLine: string;
    hover: string;
    chat: string;
    outline: string;
    text: string;
    black: string;
    errorContainer: string;
  };
  hover: {
    default: string;
    follow: string;
    error: string;
    outlined: string;
    disabled: string;
    gray: string;
    purple: string;
  };
  text: {
    default: string;
    title: string;
    error: string;
  };
  font: {
    default: string;
    title: string;
  };
  size: {
    small: string;
    medium: string;
    large: string;
  }
};
