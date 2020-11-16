import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
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
import { H2 } from '../TotalHoldings';

const Box = styled.div`
  border: 1px solid #bfb6b6;
  padding: 20px;
  margin-right: 50px;
`;
const Full = styled.div`
  display: inline-block;
`;
const Percentage = styled.input`
  padding: 10px;
`;

const PickAssetClass = styled(ComboboxInput)`
  border-left: 1px solid blue;
  padding: 10px;
`;

const GreenBox = styled.div`
  border-radius: 4px;
  padding: 10px;
  background: #04a287;
  // text-align: center;
`;

const SmallBox = styled.div`
  border: 1px solid white;
  padding: 5px;
  // margin: 14px;
  color: white;
  // width: 50%;
`;

const H2Centre = styled(H2)`
  text-align: center;
  color: black;
`;
const ModelPortfolio = () => {
  const [modelPortfolioName, setModelPortfolioName] = useState('Name Model');
  const [editName, setEditName] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [percentTotal, setPercentTotal] = useState(0);
  const [addedAsset, setAddedAsset] = useState();
  const [error, setError] = useState(false);

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

  const listAssets = [
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
      <Grid columns="4fr 2fr">
        <div>
          <ViewBtn>
            <Link to={'/'}>
              <FontAwesomeIcon icon={faAngleLeft} /> Back to ...
            </Link>
          </ViewBtn>

          <Box>
            <NameInputAndEdit
              value={modelPortfolioName}
              edit={editName}
              onChange={(e: any) => setModelPortfolioName(e.target.value)}
              onKeyPress={(e: any) => e.key === 'Enter' && setEditName(false)}
              onClick={() => setEditName(false)}
              onClickEdit={() => setEditName(true)}
            />
            {portfolio ? (
              <ul
                style={{
                  margin: '30px 10px',
                }}
              >
                {portfolio.map((cl: any) => {
                  return (
                    <>
                      <li style={{ fontSize: '2rem', fontWeight: 700 }}>
                        {cl.percent}% {cl.model_asset_class.name}
                        <span
                          style={{
                            marginLeft: '30%',
                            fontWeight: 200,
                            fontSize: '1rem',
                            color: 'red',
                          }}
                        >
                          Delete
                        </span>
                      </li>
                    </>
                  );
                })}
              </ul>
            ) : null}

            <div style={{ borderBottom: '1px solid blue' }}>
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
              {/* <PickAssetClass type="text" placeholder="Pick Asset Class" /> */}
            </div>

            {error ? (
              <>
                <span style={{ color: 'red' }}>No Asset Class Available</span>
                <br></br>
              </>
            ) : null}

            <Button style={{ marginTop: '30px' }}>Save Model</Button>
          </Box>
        </div>

        <GreenBox>
          {listAssets.length > 0 ? (
            <>
              <H2Centre>Your Asset Classes</H2Centre>
              <br></br>
              <Grid columns="3fr 3fr">
                {listAssets.map((c) => {
                  return <SmallBox>{c.model_asset_class.name}</SmallBox>;
                })}
              </Grid>
            </>
          ) : null}
        </GreenBox>
      </Grid>
    </ShadowBox>
  );
};

export default ModelPortfolio;
