import styled from '@emotion/styled';
import { css } from '@emotion/core'

const dynamicStyle = props =>
css`
  color: ${props.color};
`

// h1
export const StepQuestion = styled.p`
  font-size: 27px;
  color: #fff;
  margin-bottom: 30px;
`;

export const StepButton = styled.button`
  opacity: 0.97;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  font-size: 52px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: 1.7px;
  text-align: center;
  color: #2a2d34;
  flex: 1;
  padding: 40px 20px 30px;
  max-width: 49%;
  justify-content: space-between;
   &:hover {
  	background: var(--brand-blue);
  	color: #fff;
  }
`;


export const Step = styled.p`
  font-size: 18px;
  font-weight: 900;
  letter-spacing: 2px;
  color: #04a287;
  margin-bottom: 20px;
`;
