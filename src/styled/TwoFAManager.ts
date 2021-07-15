import styled from '@emotion/styled';
import { InputNonFormik } from './Form';
import ShadowBox from './ShadowBox';

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

export const Badge2FA = styled.div`
  text-align: center;
  font-weight: 600;
  display: inline-block;
  background-color: var(--brand-green);
  border: none;
  color: white;
  padding: 4px 6px 4px;
  margin: none;
  border-radius: 4px;
  margin-top: -2px;
`;

export const Active2FABadge = styled(Badge2FA)`
  background-color: var(--brand-green);
`;

export const Disabled2FABadge = styled(Badge2FA)`
  background-color: var(--brand-orange);
`;

export const ErrorMessage = styled(ShadowBox)`
  background-color: var(--brand-orange);
`;

export const ChoiceBox = styled.div`
  padding-left: 20px;
  padding-top: 15px;
  padding-bottom: 5px;
`;
