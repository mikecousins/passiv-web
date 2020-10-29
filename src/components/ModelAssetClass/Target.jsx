import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData } from '../../api';
import { toast } from 'react-toastify';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { loadModelAssetClasses } from '../../actions';

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
      .then((response) => {
        console.log('post model', response);
        dispatch(loadModelAssetClasses());
        toast.success(
          `${assetClass.model_asset_class.name} Asset Class Updated Successfully`,
          { autoClose: 3000 },
        );
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
            <li
              key={target.symbol.id}
              style={{
                borderBottom: '1px solid #979797 ',
                maxWidth: '400px',
                padding: '10px 0',
                margin: '10px',
              }}
            >
              <span style={{ marginRight: '2rem', fontWeight: '700' }}>
                {target.symbol.symbol}
              </span>
              <span>{target.symbol.description}</span>
              <button
                style={{
                  marginLeft: '40px',
                  color: 'red',
                  fontSize: '1rem',
                }}
                onClick={() => handleDeleteTarget(target.symbol.id)}
              >
                Delete
              </button>
            </li>
          );
        })}

        {searchSecurities &&
        selectedTarget === assetClass.model_asset_class.id ? (
          <SymbolSelector
            value={enteredSymbol}
            onSelect={(cb) => handleAddTarget(cb)}
          />
        ) : (
          <li
            style={{
              borderBottom: '1px solid #979797 ',
              maxWidth: '400px',
              padding: '10px 0',
              cursor: 'pointer',
              margin: '10px',
            }}
            onClick={() => handleSearchTarget(assetClass.model_asset_class.id)}
          >
            Add security to this asset class
          </li>
        )}
      </ul>
    </React.Fragment>
  );
};

export default Targets;
