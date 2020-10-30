import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData } from '../../api';
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

const Targets = ({ assetClass }) => {
  const dispatch = useDispatch();

  const [searchSecurities, setSearchSecurities] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState();
  const [enteredSymbol, setEnteredSymbol] = useState();

  const handleSearchTarget = (id) => {
    setSelectedTarget(id);
    setSearchSecurities(true);
  };
  const updateAssetClass = (assetClass) => {
    //? move this function to actions
    postData(
      `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
      assetClass,
    )
      .then(() => {
        dispatch(loadModelAssetClasses());
      })
      .catch(() => {
        // dispatch(loadModelAssetClasses()); //! when fails, the state doesn't changes to what it was
        toast.error(
          `${assetClass.model_asset_class.name} Asset Class Update Failed`,
          { autoClose: 3000 },
        );
      });
  };
  const handleAddTarget = (cb) => {
    assetClass.model_asset_class_target.push({ symbol: cb });
    updateAssetClass(assetClass);
    setSearchSecurities(false);
  };

  const handleDeleteTarget = (targetId) => {
    assetClass.model_asset_class_target.map((target, index) => {
      if (target.symbol.id === targetId) {
        assetClass.model_asset_class_target.splice(index, 1);
      }
    });
    updateAssetClass(assetClass);
  };

  return (
    <React.Fragment>
      <ul>
        {assetClass.model_asset_class_target.map((target) => {
          return (
            <TargetList key={target.symbol.id}>
              <span style={{ marginRight: '20px', fontWeight: '700' }}>
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
            value={enteredSymbol}
            onSelect={(cb) => handleAddTarget(cb)}
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
