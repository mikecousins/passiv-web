import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData } from '../../api';
import {
  ModelAssetClassDetailsType,
  Target,
} from '../../types/modelAssetClass';
import { Symbol } from '../../types/groupInfo';
import { loadModelAssetClasses } from '../../actions';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

const TargetList = styled.li`
  border-bottom: 1px solid #979797;
  max-width: 500px;
  padding: 10px;
  margin: 10px;
`;

type Props = {
  assetClass: ModelAssetClassDetailsType;
};

const Targets = ({ assetClass }: Props) => {
  const dispatch = useDispatch();

  const [searchSecurities, setSearchSecurities] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState('');

  const handleSearchTarget = (id: string) => {
    setSelectedTarget(id);
    setSearchSecurities(true);
  };
  const updateAssetClass = () => {
    //? move this function to actions
    postData(
      `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
      assetClass,
    )
      .then(() => {
        dispatch(loadModelAssetClasses());
      })
      .catch(() => {
        dispatch(loadModelAssetClasses());
        toast.error(
          `${assetClass.model_asset_class.name} Asset Class Update Failed`,
          { autoClose: 3000 },
        );
      });
  };

  const handleAddTarget = (cb: Symbol) => {
    const sy: Target = { symbol: cb };
    assetClass.model_asset_class_target.push(sy);

    updateAssetClass();
    setSearchSecurities(false);
  };

  const handleDeleteTarget = (targetId: string) => {
    assetClass.model_asset_class_target.map((target, index) => {
      if (target.symbol.id === targetId) {
        assetClass.model_asset_class_target.splice(index, 1);
      }
      return null;
    });
    updateAssetClass();
  };

  return (
    <React.Fragment>
      <ul>
        {assetClass.model_asset_class_target.map((target) => {
          return (
            <TargetList key={target.symbol.id}>
              <span style={{ marginRight: '20px', fontWeight: 700 }}>
                {target.symbol.symbol}
              </span>
              <button
                onClick={() => handleDeleteTarget(target.symbol.id)}
                style={{ float: 'right' }}
              >
                <FontAwesomeIcon
                  icon={faTimes}
                  size="sm"
                  style={{ position: 'relative' }}
                />
              </button>
              {target.symbol.description}
            </TargetList>
          );
        })}

        {searchSecurities &&
        selectedTarget === assetClass.model_asset_class.id ? (
          <SymbolSelector
            value={null}
            onSelect={(cb) => handleAddTarget(cb)}
            allSymbols={true}
            forModelSecurity={false}
          />
        ) : (
          <TargetList
            style={{ cursor: 'pointer' }}
            onClick={() => handleSearchTarget(assetClass.model_asset_class.id)}
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="sm"
              style={{ position: 'relative' }}
            />{' '}
            Add Security
          </TargetList>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Targets;
