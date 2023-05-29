import styled from 'styled-components';
import { useFindAllTagQuery } from '@training-project/data-access';
/* eslint-disable-next-line */
export interface FeatureSetsProps {}

const StyledFeatureSets = styled.div`
  color: pink;
`;

export function FeatureSets(props: FeatureSetsProps) {
  const { data, error, loading } = useFindAllTagQuery();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :({error.message}</p>;
  return (
    <StyledFeatureSets>
      <ul>
        {data?.findAllTag.map(({ name }, index) => (
          <li key={index}>
            <strong>{name}</strong>
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          list-style: none;
          margin: 0;
          font-family: sans-serif;
          width: 100%;
        }

        li {
          padding: 8px;
        }

        li:nth-child(2n) {
          background-color: #eee;
        }

        span.year {
          display: block;
          width: 20%;
        }
      `}</style>
    </StyledFeatureSets>
  );
}

export default FeatureSets;
