import styled from '@emotion/styled';

export const BarsContainer = styled.div`
  justify-content: flex-start;
  background: #eee;
  position: relative;
  height: 32px;
  min-width: 31%;
  input {
    background: none;
    text-align: right;
    display: inline-block;
    border-bottom: 2px solid var(--brand-blue);
    padding-top: 3px;
    width: 56px;
  }
  input[readonly]{
    border-bottom: 2px solid transparent;
  }
`;
export const InputContainer = styled.div`

`;
export const Symbol = styled.div`
  display: block;
`;
export const Actual = styled.div`
  text-align: right;
`;
export const Target = styled.div`
  text-align: right;
`;
export const Delta = styled.div`
  text-align: right;
`;
export const Bar = styled.span`
  background: #04a287;
  text-align: left;
  display: inline-block;
  height: 32px;
  width: 0%;
  transition: .5s all;
`;

export const BarTarget = styled.span`

`;
export const BarActual = styled.span`

`;
