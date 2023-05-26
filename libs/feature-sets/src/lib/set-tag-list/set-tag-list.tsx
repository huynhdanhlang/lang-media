import styled from 'styled-components';

/* eslint-disable-next-line */
export interface SetTagListProps {}

const StyledSetTagList = styled.div`
  color: pink;
`;

export function SetTagList(props: SetTagListProps) {
  return (
    <StyledSetTagList>
      <h1>Welcome to SetTagList!</h1>
    </StyledSetTagList>
  );
}

export default SetTagList;
