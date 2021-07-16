import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
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
import Tour from '../Tour/Tour';
import { AssetClassBoxSteps } from '../Tour/TourSteps';

const Box = styled.div`
  border-radius: 4px;
  padding: 15px;
  border: 2px solid;
  height: fit-content;
  margin-top: 20px;
`;

const StyledH3 = styled(H3)`
  font-size: 20px;
`;

const SmallBox = styled.div`
  border: 1px solid var(--brand-blue);
  padding: 10px;
  color: var(--brand-blue);
  text-align: center;
  font-weight: 600;
`;

const ResponsiveGrid = styled(Grid)`
  @media (max-width: 900px) {
    display: grid;
    grid-gap: 20px;
  }
`;

const GoToAssetClasses = styled(Button)`
  margin-top: 30px;
`;

type Props = {
  assetClasses: ModelAssetClassDetailsType[];
  modelId: string;
};

const AssetClassesBox = ({ assetClasses, modelId }: Props) => {
  const dispatch = useDispatch();

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
      <Tour steps={AssetClassBoxSteps} name="asset_class_box_tour" />
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
                      <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                    </Tooltip>
                  ) : (
                    <Tooltip label={'Empty Asset Class'}>
                      <FontAwesomeIcon icon={faInfoCircle} size="sm" />
                    </Tooltip>
                  )}
                </SmallBox>
              );
            })}
          </ResponsiveGrid>
          <GoToAssetClasses
            onClick={() =>
              dispatch(push(`/asset-class?back=/model-portfolio/${modelId}`))
            }
          >
            Edit Asset Classes
          </GoToAssetClasses>
        </>
      ) : (
        <>
          <p>You still need to define your asset classes. </p>
          <GoToAssetClasses
            onClick={() =>
              dispatch(push(`/asset-class?back=/model-portfolio/${modelId}`))
            }
            className="tour-add-asset-class"
          >
            Add Asset Classes
          </GoToAssetClasses>
        </>
      )}
    </Box>
  );
};

export default AssetClassesBox;
