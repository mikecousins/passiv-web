import React, { useEffect, useState } from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getData } from '../../api';
import { selectCurrentGroupId } from '../../selectors/groups';
import ShadowBox from '../../styled/ShadowBox';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData(`/api/v1/portfolioGroups/${groupId}/assetClassPriorities`).then(
      (res) => {
        setAssetClassPriorities(res.data);
        setLoading(false);
      },
    );
  }, [groupId]);

  return (
    <ShadowBox>
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        assetClassPriorities?.map((assetClass) => {
          return <AssetClassPriority assetClass={assetClass} />;
        })
      )}
    </ShadowBox>
  );
};

export default Prioritization;
