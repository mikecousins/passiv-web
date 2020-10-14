import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { selectCurrentGroupId } from '../../selectors/groups';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import SymbolDetail from '../SymbolDetail';
import { Symbol } from '../../styled/Target';

const NewClassBox = styled.div`
  border: 1px solid #979797;
  width: 50%;
  height: 171px;
  box-sizing: border-box;
  padding: 30px 0 0 40px;
  margin: 20px;
  font-style: italic;
`;
const BigInput = styled.input`
  width: 60%;
  margin-bottom: 1rem;
  padding: 10px;
  font-size: 1.7rem;
  font-weight: 500;
`;
// const SmallInput = styled.input`
//   width: 80%;
//   border-bottom: 1px solid #dcdcdc;
//   padding: 10px;
//   font-size: 1rem;
//   align: left;
//   letter-spacing: 0.18px;
// `;

export const AddAssetClass = () => {
  // const [assetClassName, setAssetClassName] = useState();
  const [enteredSecurity, setEnteredSecurity] = useState();
  const [assetClasses, setAssetClasses] = useState([]);

  // const handleAssetClassNameChange = (event) => {
  //   setAssetClassName(event.target.value);
  //   console.log(event.target.value);
  // };
  const handleSecurityChange = (cb) => {
    console.log(cb);

    // setEnteredSecurity(enteredSecurity => [...enteredSecurity, cb]);
    // display the security => Symbol Description

    // save the security

    // create a new SymbolSelector input
  };

  const onEnter = (e) => {
    const val = e.target.value;
    if (e.charCode === 13) {
      setAssetClasses((assetClasses) => [...assetClasses, { assetClass: val }]); //? give me an error in tsx
    }
    console.log(assetClasses);
  };

  return (
    <NewClassBox>
      <BigInput
        type="text"
        placeholder="New Asset Class"
        onKeyPress={onEnter}
      />
      <br></br>
      <SymbolSelector value={enteredSecurity} onSelect={handleSecurityChange} />
      <br></br>
      {/* <span>{enteredSecurity ? enteredSecurity : null}</span> */}
    </NewClassBox>
  );
};
