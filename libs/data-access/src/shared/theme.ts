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
    background: background,
    border: isSetBorder ? '1px solid rgba(152, 188, 252, 0.16)' : 'inherit',
  };
};

export const notificationStyle: CSSProperties = {
  background: 'gray',
};

export const layoutStyle = {
  background: '#001529',
};

export const profileStyle = {
  background: 'rgba(220, 220, 242, 0.65)',
};

export const titleStyle = {
  fontSize: 28,
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
};

export const titleFixed: CSSProperties = {
  position: 'fixed',
  overflow: 'unset',
  zIndex: 10,
  left: '50%',
  transform: 'translateX(-50%)',
};
