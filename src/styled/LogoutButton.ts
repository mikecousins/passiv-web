import styled from '@emotion/styled';

export const LogoutButton = styled.button`
  background-color: white;
  border: 1px solid var(--brand-grey);
  color: var(--brand-grey);
  padding: 15px 18px 16px;
  margin: 0 5px 5px 5px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.8px;
  border-radius: 2px;
  transition: 0.3s;

  :hover {
    background-color: var(--brand-grey);
    color: var(--white);
  }
`;
