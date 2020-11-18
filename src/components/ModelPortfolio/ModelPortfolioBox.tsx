import React, { useState } from 'react';
import { ModelAssetClass } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import AssetClassSelector from './AssetClassSelector';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styled/Button';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledContainer = styled.div`
  background: #fff;
  display: inline-block;
  position: relative;
  top: -24px;
  padding: 0 15px;
  margin-bottom: -7px;
`;
const Percentage = styled.div`
  display: inline-block;
`;

const PercentageLabel = styled.label`
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
  margin-right: 10px;
`;

const PercentageInput = styled.input`
  max-width: 70px;
  color: var(--brand-blue);
  font-weight: 600;
  font-size: 26px;
`;

const StyledName = styled.span`
  font-weight: 600;
  font-size: 30px;
`;

type Props = {
  assetClasses: ModelAssetClass[];
};

const ModelPortoflioBox = ({ assetClasses }: Props) => {
  const [
    listOfAssetClassesAvailable,
    setListOfAssetClassesAvailable,
  ] = useState(assetClasses);

  const [modelPortfolioName, setModelPortfolioName] = useState('New Model');
  const [editName, setEditName] = useState(false);
  const [notAssetError, setNotAssetError] = useState(false);
  const [percentError, setPercentError] = useState(false);
  const [enteredAssetClass, setEnteredAssetClass] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [percentTotal, setPercentTotal] = useState(0);
  const [addedAsset, setAddedAsset] = useState<ModelAssetClass>();

  type modelPortfolio = {
    model_asset_class: object;
    percent: number;
  };
  const [portfolio, setPortfolio] = useState<modelPortfolio[]>([]);

  const add = () => {
    if (addedAsset && percentTotal + percentage <= 100) {
      const assetClassesCopy = [...listOfAssetClassesAvailable];
      assetClassesCopy.map((cls, index) => {
        if (cls.id === addedAsset.id) {
          assetClassesCopy.splice(index, 1);
          setListOfAssetClassesAvailable(assetClassesCopy);
        }
      });

      let perc = percentTotal;
      perc = percentTotal + percentage;
      setPercentTotal(perc);

      const copy = [...portfolio];
      copy.push({
        model_asset_class: addedAsset,
        percent: percentage,
      });
      setPortfolio(copy);
      setPercentage(0);
    } else if (!addedAsset) {
      setNotAssetError(true);
      setPercentage(0);
    } else if (percentTotal + percentage > 100) {
      setPercentError(true);
      setPercentage(0);
    }
  };

  const handlePercentageChange = (e: any) => {
    //? Is this the right way to check if the input is number
    if (Number.isInteger(+e.target.value) && +e.target.value <= 100) {
      setPercentage(+e.target.value);
    } else {
      setPercentage(0);
    }
  };

  return (
    <Box>
      <NameInputAndEdit
        value={modelPortfolioName}
        edit={editName}
        editBtnTxt={'Edit Name'}
        onChange={(e: any) => setModelPortfolioName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && setEditName(false)}
        onClickDone={() => setEditName(false)}
        onClickEdit={() => setEditName(true)}
        StyledName={StyledName}
        StyledContainer={StyledContainer}
      />
      {portfolio ? (
        <ul
          style={{
            margin: '40px 20px',
          }}
        >
          {portfolio.map((cl: any) => {
            return (
              <li
                style={{
                  borderLeft: '5px solid var(--brand-green)',
                  lineHeight: '30px',
                  padding: '10px',
                  marginBottom: '20px',
                }}
                key={cl.model_asset_class.id}
              >
                <span style={{ fontSize: '26px' }}>
                  {cl.percent}% {cl.model_asset_class.name}
                </span>
                <button
                  // onClick={() => }
                  style={{ marginLeft: '50px', position: 'relative' }}
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    size="sm"
                    style={{ position: 'relative' }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div
        style={{ borderBottom: '1px solid var(--brand-blue)', margin: '20px' }}
      >
        <Percentage>
          <PercentageInput
            type="text"
            value={percentage}
            onChange={handlePercentageChange}
            id="percentage"
            onKeyPress={(e: any) => e.key === 'Enter' && add()}
          />
          <PercentageLabel htmlFor="percentage">%</PercentageLabel>
        </Percentage>

        <AssetClassSelector
          value={enteredAssetClass}
          assetClassesAvailable={listOfAssetClassesAvailable}
          onSelect={(cb) => setAddedAsset(cb)}
        />
      </div>

      {notAssetError ? (
        <>
          <span style={{ color: 'red' }}>
            Please select from the list of asset classes
          </span>
          <br></br>
        </>
      ) : null}

      {percentError ? (
        <>
          <span style={{ color: 'red' }}>
            100% has been already assigned to asset classes
          </span>
          <br></br>
        </>
      ) : null}

      <Button style={{ margin: '30px 20px' }}>Save Model</Button>
    </Box>
  );
};

export default ModelPortoflioBox;
