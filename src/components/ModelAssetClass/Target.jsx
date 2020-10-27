import React, { useState } from 'react';
import { connect } from 'react-redux';
import SymbolSelector from '../PortfolioGroupTargets/TargetBar/SymbolSelector';
import { updateAssetClass } from '../../actions/modelAssetClass';

const Targets = ({ assetClass, onUpdateAssetClass }) => {
  const [searchSecurities, setSearchSecurities] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState();
  const [enteredSymbol, setEnteredSymbol] = useState();

  const handleSearchTarget = (id) => {
    setSelectedTarget(id);
    setSearchSecurities(true);
  };

  const handleAddTarget = (cb) => {
    assetClass.model_asset_class_target.push({ symbol: cb });
    onUpdateAssetClass(assetClass);
    setSearchSecurities(false);
  };

  const handleDeleteTarget = (targetId) => {
    assetClass.model_asset_class_target.map((target, index) => {
      if (target.symbol.id === targetId) {
        assetClass.model_asset_class_target.splice(index, 1);
      }
    });
    onUpdateAssetClass(assetClass);
  };

  return (
    <React.Fragment>
      <ul style={{ margin: '30px' }}>
        {assetClass.model_asset_class_target.map((target) => {
          return (
            <li
              key={target.symbol.id}
              style={{
                borderBottom: '1px solid #979797 ',
                width: '60%',
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
              width: '60%',
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

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAssetClass: (assetClass) => dispatch(updateAssetClass(assetClass)),
  };
};
export default connect(null, mapDispatchToProps)(Targets);
