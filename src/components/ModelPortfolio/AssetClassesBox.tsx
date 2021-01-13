import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from '@emotion/styled';
import Grid from '../../styled/Grid';
import Tooltip from '../Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { H3 } from '../../styled/GlobalElements';
import { Button } from '../../styled/Button';
import {
  ModelAssetClassDetailsType,
  Target,
} from '../../types/modelAssetClass';

const Box = styled.div`
  border-radius: 4px;
  padding: 20px;
  background: var(--brand-green);
  height: fit-content;
`;

const StyledH3 = styled(H3)`
  font-size: 20px;
`;

const SmallBox = styled.div`
  border: 1px solid white;
  padding: 10px;
  color: white;
  text-align: center;
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: 900px) {
    display: grid;
    grid-gap: 20px;
  }
`;

type Props = {
  assetClasses: ModelAssetClassDetailsType[];
};

const AssetClassesBox = ({ assetClasses }: Props) => {
  const [backToAssetClass, setBackToAssetClass] = useState(false);

  if (backToAssetClass) {
    return <Redirect exact to="/app/asset-class" />;
  }

  const makeLabel = (target: Target[]) => {
    let labelList: string[] = [];
    if (target.length > 0) {
      target.map((t) => {
        if (t.symbol.symbol) {
          labelList.push(t.symbol.symbol);
        }
        return labelList;
      });
    }
    const label = labelList.join(', ');
    return label;
  };

  return (
    <Box>
      <StyledH3>Your Asset Classes</StyledH3>
      <br></br>
      {assetClasses.length > 0 ? (
        <>
          <ResponsiveGrid columns="1fr 1fr">
            {assetClasses.map((cls) => {
              return (
                <SmallBox key={cls.model_asset_class.id}>
                  {cls.model_asset_class.name}{' '}
                  {cls.model_asset_class_target.length > 0 ? (
                    <Tooltip label={makeLabel(cls.model_asset_class_target)}>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ fontSize: 12 }}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label={'No Security Added'}>
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        style={{ fontSize: 12 }}
                      />
                    </Tooltip>
                  )}
                </SmallBox>
              );
            })}
          </ResponsiveGrid>
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
    </Box>
  );
};

export default AssetClassesBox;
