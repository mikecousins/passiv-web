import React from 'react';
import {
  ModelAssetClassWithPercentage,
  TargetWithPercentage,
} from '../../types/modelPortfolio';

type Props = {
  model: ModelAssetClassWithPercentage[] | TargetWithPercentage[];
  securityBased: Boolean;
};

const ListAssets = ({ model, securityBased }: Props) => {
  console.log(model, securityBased);

  return (
    <>
      {/* {!securityBased
        ? model.map((cl: any) => {
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
                  onClick={() => handleDelete(cl.model_asset_class.id)}
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
          })
        : model.map((sec) => {
            return (
              <li
                style={{
                  borderLeft: '5px solid var(--brand-green)',
                  lineHeight: '30px',
                  padding: '10px',
                  marginBottom: '20px',
                }}
                key={sec.symbol.id}
              >
                <span style={{ fontSize: '26px' }}>
                  {sec.percent}% {sec.symbol.symbol}
                </span>
                {!sharedModel && (
                  <button
                    onClick={() => handleDelete(sec.symbol.id)}
                    style={{ marginLeft: '50px', position: 'relative' }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size="sm"
                      style={{ position: 'relative' }}
                    />
                  </button>
                )}
              </li>
            );
          })} */}
    </>
  );
};

export default ListAssets;
