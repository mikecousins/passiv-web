import styled from '@emotion/styled';

export default styled.div`
  background: var(--white);
  background-color: ${props => props.dark ? 'var(--brand-grey)' : 'var(--white)'};
  border-radius: 4px;
  box-shadow: var(--box-shadow);
  padding: 20px 20px 20px;
  margin-bottom: 20px;
  @media (max-width: 900px) {
  	padding: 15px;
  }
`;
