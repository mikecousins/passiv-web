import styled from '@emotion/styled';

export const Questions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    margin-bottom: 25px;
    max-width: 49%;
    min-width: 49%;
    padding: 20px;
    flex: 1;
    h3 {
      color: var(--brand-green);
    }
  }
`;
