import styled from '@emotion/styled';

export const BarContainer = styled.div`
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
  position: absolute;
  right: 6px;
  top: 6px;
`;
export const Symbol = styled.div`
  display: block;
`;
export const Actual = styled.div`
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
