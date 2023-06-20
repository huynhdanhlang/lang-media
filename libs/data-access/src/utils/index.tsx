import { colors } from "./style";

export const randomColor = () => {
    const length = colors.length;
    return colors[Math.floor(Math.random() * length)];
  };