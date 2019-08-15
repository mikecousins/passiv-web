import styled from '@emotion/styled';

export const BarsContainer = styled.div`
  background: #b3c1be;
  position: relative;
  margin-bottom: 10px;
`;
export const InputContainer = styled.div``;
export const Symbol = styled.div`
  display: block;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: left;
`;
export const Actual = styled.div`
  text-align: right;
  color: var(--brand-green);
  font-weight: 700;
  width: 100px;
`;
export const Target = styled.div`
  color: var(--brand-blue);
  font-weight: 700;
  align-contents: flex-end;
  margin-left: auto;
  width: 100px;
  input {
    color: var(--brand-blue);
    width: 52px;
    font-weight: 700;
    text-align: right;
    background: none;
    display: inline-block;
    border: 2px solid var(--brand-green);
    transition: all 0.25s;
    margin-top: -7px;
    margin-right: 3px;
    padding: 3px 0 3px 3px;
    position: relative;
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;
    &[readonly] {
      border: 2px solid transparent;
      padding: 3px 0 3px 3px;
      margin-right: 0;
      &::-webkit-inner-spin-button {
        display: none;
      }
    }
    &::-webkit-inner-spin-button {
      opacity: 1;
      font-size: 30px;
      margin-left: 3px;
    }
  }
`;
export const Delta = styled.div`
  text-align: right;
`;
export const Bar = styled.span`
  background: rgba(62, 210, 177, 0.74);
  display: block;
  height: 25px;
  width: 0%;
  transition: 0.5s all;
`;
export const BarActual = styled.span`
  position: relative;
  z-index: 0;
  display: block;
`;
export const BarTarget = styled.span`
  display: block;
  top: -8px;
  position: absolute;
  width: 100%;
  z-index: 0;
  span {
    height: 34px;
    background: transparent;
    border-right: 5px solid #0144ff;
  }
`;
export const Container = styled.div`
  padding: 8px 5px 2px;
  margin-bottom: 15px;
  position: relative;
`;
export const TargetRow = styled.div`
  margin: 0 10px 0 auto;
  text-align: right;
  justify-content: space-between;
  display: flex;
  letter-spacing: 0.05em;
  h3 {
    text-transform: uppercase;
    width: 100px;
    &:last-of-type {
      color: var(--brand-green);
    }
    &:nth-of-type(2) {
      margin-left: auto;
      color: var(--brand-blue);
    }
  }
`;
export const Close = styled.button`
  background: #fff;
  position: absolute;
  top: 0;
  left: -4px;
  padding: 8px 11px 8px;
  z-index: 4;
  box-shadow: var(--box-shadow);
  border-bottom-right-radius: 4px;
`;
