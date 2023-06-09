import { CSSProperties } from 'styled-components';
interface IBackgroundBorder {
  background: string;
  isSetBorder: boolean;
}
export const backgroudBorder = ({
  background,
  isSetBorder,
}: IBackgroundBorder): CSSProperties => {
  return {
    background,
    border: isSetBorder ? '1px solid rgba(152, 188, 252, 0.16)' : 'inherit',
  };
};
