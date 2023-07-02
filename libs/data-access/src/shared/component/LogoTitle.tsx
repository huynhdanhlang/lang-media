import styled, { CSSProperties } from 'styled-components';
import Link from 'next/link';
import { backgroudBorder, layoutStyle } from '../theme';

export const Logo = styled.img`
  display: inline-block;
  height: 50px;
  vertical-align: middle;
`;

const Title = styled.div`
  display: inline-block;
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin-left: 12px;
  font-family: 'Arial';
  vertical-align: middle;
`;

const TitleWrapper = styled.div`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  transition: all 0.3s;
  background: #001529;
`;
interface ICNLogo {
  style?: CSSProperties;
}
export const CNLogo = (props: ICNLogo) => (
  <TitleWrapper
    style={{
      ...backgroudBorder({
        isSetBorder: false,
        ...layoutStyle,
      }),
      ...props.style,
    }}
  >
    <Link legacyBehavior href="/">
      <a style={{ display: 'inline-block' }}>
        <Logo
          src="https://files.cults3d.com/uploaders/17356829/illustration-file/2e1f9093-bd12-4126-aad4-8469687bf1eb/darkrai.jpg"
          alt="logo"
        />
        <Title>Làng Media</Title>
      </a>
    </Link>
  </TitleWrapper>
);
