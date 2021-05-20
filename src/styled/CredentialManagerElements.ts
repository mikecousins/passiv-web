import styled from '@emotion/styled';
import { InputNonFormik } from '../styled/Form';

export const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 5px;
  font-size: 18px;
`;

export const MiniInputNonFormik = styled(InputNonFormik)`
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 1em;
  padding: 15px 12px;
`;

export const LogoContainer = styled.div`
  img {
    max-width: 100%;
  }
`;

export const Error = styled.p`
  color: red;
  margin-bottom: 10px;
`;
