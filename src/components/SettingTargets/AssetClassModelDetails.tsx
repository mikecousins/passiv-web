import React from 'react';
import { H3, P } from '../../styled/GlobalElements';
import Grid from '../../styled/Grid';

type Props = {
  assetClassesDetails: any; //! change this to an actual type
  assetClassId: string;
};
const AssetClassModelDetails = ({
  assetClassesDetails,
  assetClassId,
}: Props) => {
  const preview: any = [];
  assetClassesDetails?.model_asset_classes_preview.map((model: any) => {
    if (
      model.model_portfolio_asset_class.model_asset_class.id === assetClassId
    ) {
      model.model_asset_class_accounts_preview.map((asset: any) => {
        return preview.push(asset);
      });
    }
  });

  let accountName;
  let assets;
  preview.map((p: any) => {
    accountName = (
      <H3
        style={{
          fontSize: '18px',
          marginBottom: '20px',
        }}
      >
        {p.account.name}
      </H3>
    );
    assets = p.tradable_symbols.map((symbol: any) => {
      return (
        <Grid columns="100px 1fr">
          <H3 style={{ fontSize: '16px', marginBottom: '10px' }}>
            {symbol.symbol}
          </H3>
          <P>{symbol.description}</P>
        </Grid>
      );
    });
  });

  return (
    <>
      {accountName}
      {assets}
    </>
  );
};

export default AssetClassModelDetails;
