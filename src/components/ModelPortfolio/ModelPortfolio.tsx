import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { H3 } from '../../styled/GlobalElements';
import ShadowBox from '../../styled/ShadowBox';
import Grid from '../../styled/Grid';
import { Button } from '../../styled/Button';
import NameInputAndEdit from '../NameInputAndEdit';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import { ViewBtn } from '../../styled/Group';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  margin-right: 50px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgb(42, 45, 52);
`;
const Full = styled.div`
  display: inline-block;
`;
const Percentage = styled.input`
  padding: 10px;
`;

const BackButton = styled(ViewBtn)`
  margin-bottom: 20px;
`;

const PickAssetClass = styled(ComboboxInput)`
  border-left: 1px solid var(--brand-blue);
  padding: 10px;
`;

const HiddenDeleteBtn = styled.span`
  margin-left: 30%;
  font-weight: 200;
  font-size: 1rem;
  // color: red;
  // display: none;
`;

const ListOfAssetClasses = styled.li`
  font-size: 2rem;
  font-weight: 700;
  //! Change this to show delete button on hover
  ${HiddenDeleteBtn} {
    color: red;
  }
`;

const GreenBox = styled.div`
  border-radius: 4px;
  padding: 20px;
  background: var(--brand-green);
  height: fit-content;
`;

const SmallBox = styled.div`
  border: 1px solid white;
  padding: 10px;
  color: white;
  text-align: center;
  width: fit-content;
`;

const StyledH3 = styled(H3)`
  font-size: 20px;
`;

const ModelPortfolio = () => {
  const [modelPortfolioName, setModelPortfolioName] = useState('Name Model');
  const [editName, setEditName] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [percentTotal, setPercentTotal] = useState(0);
  const [addedAsset, setAddedAsset] = useState();
  const [error, setError] = useState(false);
  const [backToAssetClass, setBackToAssetClass] = useState(false);

  const [
    listOfAssetClassesAvailable,
    setListOfAssetClassesAvailable,
  ] = useState([
    {
      model_asset_class: {
        id: '0a0b5351-1284-4e22-990e-53296411f450',
        name: 'Bonds',
      },
    },
    {
      model_asset_class: {
        id: '4dd90411-f063-49d8-a684-c5b6deebf4d6',
        name: 'Canadian Equity',
      },
    },
    {
      model_asset_class: {
        id: '4dd90411',
        name: 'International Equity',
      },
    },
  ]);

  const listAssets: any[] = [
    {
      model_asset_class: {
        id: '0a0b5351-1284-4e22-990e-53296411f450',
        name: 'Bonds',
      },
    },
    {
      model_asset_class: {
        id: '4dd90411-f063-49d8-a684-c5b6deebf4d6',
        name: 'Canadian Equity',
      },
    },
    {
      model_asset_class: {
        id: '4dd90411',
        name: 'International Equity',
      },
    },
  ];

  type modelPortfolio = {
    model_asset_class: {
      name: string | null;
      id: string;
    };
    percent: number;
  };

  const [portfolio, setPortfolio] = useState<modelPortfolio[]>([]);

  if (backToAssetClass) {
    return <Redirect to="asset-class/6050c7fa-7c27-47d8-b5b6-206cbc994733" />;
  }

  const handlePercentageChange = (e: any) => {
    //? Is this the right way to check if the input is number
    //! percentage check less than 100 not working properly
    if (Number.isInteger(+e.target.value) && +e.target.value <= 100) {
      setPercentage(+e.target.value);
    } else {
      setPercentage(0);
    }
  };

  const add = () => {
    if (percentTotal + percentage > 100) {
      //! this doesn't update the percentage to 0
      console.log(percentTotal);
      console.log(percentage);
      setPercentage(0);
      console.log('perc', percentage);
    }
    if (addedAsset) {
      const assetClassesCopy = [...listOfAssetClassesAvailable];
      assetClassesCopy.map((cls, index) => {
        if (cls.model_asset_class.name === addedAsset) {
          assetClassesCopy.splice(index, 1);
          setListOfAssetClassesAvailable(assetClassesCopy);
        }
      });

      let perc = percentTotal;
      perc = percentTotal + percentage;
      console.log('here', percentage);
      setPercentTotal(perc);

      const copy = [...portfolio];
      copy.push({
        model_asset_class: {
          name: addedAsset!,
          id: '03-9102-930912',
        },
        percent: percentage,
      });
      setPortfolio(copy);
      setPercentage(0);
    } else {
      setError(true);
    }
  };

  return (
    <ShadowBox>
      <BackButton>
        <Link to={'/'}>
          <FontAwesomeIcon icon={faAngleLeft} /> Back to ...
        </Link>
      </BackButton>
      <Grid columns="4fr 2fr">
        <Box>
          <NameInputAndEdit
            value={modelPortfolioName}
            edit={editName}
            onChange={(e: any) => setModelPortfolioName(e.target.value)}
            onKeyPress={(e: any) => e.key === 'Enter' && setEditName(false)}
            onClick={() => setEditName(false)}
            onClickEdit={() => setEditName(true)}
            styleDiv={{
              background: '#fff',
              display: 'inline-block',
              position: 'relative',
              top: '-24px',
              padding: '0 15px',
              marginBottom: '-7px',
            }}
          />
          {portfolio ? (
            <ul
              style={{
                margin: '30px 10px',
              }}
            >
              {portfolio.map((cl: any) => {
                return (
                  <ListOfAssetClasses>
                    {cl.percent}% {cl.model_asset_class.name}
                    <HiddenDeleteBtn>Delete</HiddenDeleteBtn>
                  </ListOfAssetClasses>
                );
              })}
            </ul>
          ) : null}

          <div style={{ borderBottom: '1px solid var(--brand-blue)' }}>
            <Full>
              <Percentage
                type="text"
                value={percentage}
                onChange={handlePercentageChange}
                id="percentage"
                onKeyPress={(e: any) => e.key === 'Enter' && add()}
              />
              <label htmlFor="percentage"> % </label>
            </Full>
            <Combobox style={{ display: 'inline-block' }}>
              <PickAssetClass
                placeholder="Pick Asset Class"
                onSelect={(e: any) => setAddedAsset(e.target.value)}
                onKeyPress={(e: any) => e.key === 'Enter' && add()}
              />
              <ComboboxPopover>
                <ComboboxList>
                  {listOfAssetClassesAvailable.map((cls) => {
                    return (
                      <ComboboxOption value={cls.model_asset_class.name} />
                    );
                  })}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
          </div>

          {error ? (
            <>
              <span style={{ color: 'red' }}>No Asset Class Available</span>
              <br></br>
            </>
          ) : null}

          <Button style={{ marginTop: '30px' }}>Save Model</Button>
        </Box>

        <GreenBox>
          <StyledH3>Your Asset Classes</StyledH3>
          <br></br>
          {listAssets.length > 0 ? (
            <>
              <Grid columns="1fr 1fr">
                {listAssets.map((c) => {
                  return <SmallBox>{c.model_asset_class.name}</SmallBox>;
                })}
              </Grid>
              <Button
                style={{ marginTop: '30px' }}
                onClick={() => setBackToAssetClass(true)}
              >
                Edit Asset Classes
              </Button>
            </>
          ) : (
            <>
              <p style={{ color: 'white' }}>
                You still need to define your asset classes.{' '}
              </p>
              <Button
                style={{ marginTop: '30px' }}
                onClick={() => setBackToAssetClass(true)}
              >
                Add Asset Classes
              </Button>
            </>
          )}
        </GreenBox>
      </Grid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
