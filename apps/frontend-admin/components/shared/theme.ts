import { CSSProperties } from 'styled-components';
interface IBackgroundBorder {
  background: string | number;
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

export const notificationStyle: CSSProperties = {
  background: 'gray',
};

export const layoutStyle = {
  background: 'rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))!important',
};

export const profileStyle = {
  background: 'rgba(220, 220, 242, 0.65)',
}