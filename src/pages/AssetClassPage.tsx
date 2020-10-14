import React, { useState } from 'react';
import { H1, P } from '../styled/GlobalElements';
import { Button } from '../styled/Button';
import ShadowBox from '../styled/ShadowBox';
import { AddAssetClass } from '../components/AssetClass/AddAssetClass.jsx';
const AssetClassPage = () => {
  const [inputList, setInputList] = useState([<AddAssetClass />]);

  // On Component Mount Check to see if there is any asset class available for the group id
  // if it is:
  // setInputList(<AddAssetClass )
  const handleBtnClick = () => {
    const input = inputList;
    setInputList(input.concat(<AddAssetClass />));
  };
  return (
    <React.Fragment>
      <H1>Set up your asset classes</H1>
      <P>
        An asset class contains of an asset class title and the securities that
        will go into them.
        <br></br>
        Create your asset classes and add your securities.
      </P>
      <ShadowBox>
        {inputList.map((input) => {
          return input;
        })}
      </ShadowBox>
      <Button onClick={handleBtnClick}>+ Add Asset Class</Button>
    </React.Fragment>
  );
};

export default AssetClassPage;
