import styled from '@emotion/styled';

export const BarsContainer = styled.div`
  background: #b3c1be;
  position: relative;
  margin-bottom: 10px;
`;
export const InputContainer = styled.div`

`;
export const Symbol = styled.div`
  display: block;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: left;
`;
export const Actual = styled.div`
  text-align: right;
  color: var(--brand-blue);
  font-weight: 700;
  width: 100px;
`;
export const Target = styled.div`
  color: var(--brand-green);
  font-weight: 700;
  align-contents: flex-end;
  margin-left: auto;
  width: 100px;
  input {
    color: var(--brand-green);
    width: 52px;
    font-weight: 700;
    text-align: right;
    background: none;
    display: inline-block;
    border: 2px solid var(--brand-blue);
    transition: all .25s;
    margin-top: -7px;
    padding: 3px 0 3px 3px;
    &[readonly]{
      border: 2px solid transparent;
      margin-right: -15px;
    }
  }
`;
export const Delta = styled.div`
  text-align: right;
`;
export const Bar = styled.span`
  background: rgba(62, 210, 177, .74);
  display: block;
  height: 25px;
  width: 0%;
  transition: .5s all;
`;
export const BarTarget = styled.span`
  position: relative;
  z-index: 4;
  display: block;
`;
export const BarActual = styled.span`
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
  background: #f5f5f5;
  padding: 15px 15px 10px;
  box-shadow: var(--box-shadow);
  margin-bottom: 15px;
  position: relative;
`;
export const TargetRow = styled.div`
  justify-content: space-between;
  display: flex;
  margin: 0 10px 0 auto;
  text-align: right;
  h3 {
    text-transform: uppercase;
    width: 100px;
    &:last-child {
      color: var(--brand-blue);
    }
    &:nth-child(2) {
      margin-left: auto;
      color: var(--brand-green);
    }
  }
`;
export const Close = styled.button`
  position: absolute;
  top: 0;
  left: -4px;
  padding: 8px 11px 8px;
  z-index: 4;
  box-shadow: var(--box-shadow);
  border-bottom-right-radius: 4px;
`;
