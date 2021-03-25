import React, { useEffect, useState } from 'react';
import { faCheck, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getData } from '../../api';
import { selectCurrentGroupId } from '../../selectors/groups';
import { AssetClassPriorities } from '../../types/modelPortfolio';
import AssetClassPriority from './AssetClassPriority';
import { Edit, H2 } from '../../styled/GlobalElements';
import styled from '@emotion/styled';

const Priorities = styled.div`
  > h2 {
    margin: 20px 0px;
    display: inline-block;
  }
  > button {
    font-size: 18px;
    > svg {
      margin-right: 5px;
      font-size: 18px;
    }
  }
`;

const Divider = styled.hr`
  border-top: 1px solid #2a2d34;
`;

const Done = styled(Edit)``;

const Prioritization = () => {
  const groupId = useSelector(selectCurrentGroupId);
  const [assetClassPriorities, setAssetClassPriorities] = useState<
    AssetClassPriorities[]
  >();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getData(`/api/v1/portfolioGroups/${groupId}/assetClassPriorities`).then(
      (res) => {
        setAssetClassPriorities(res.data);
        setLoading(false);
      },
    );
  }, [groupId]);

  return (
    <Priorities>
      <Divider></Divider>
      <H2>Priorities</H2>
      {editing ? (
        <Done onClick={() => setEditing(false)}>
          <FontAwesomeIcon icon={faCheck} />
          Save changes
        </Done>
      ) : (
        <Edit onClick={() => setEditing(true)}>
          <FontAwesomeIcon icon={faPen} />
          Edit Priorities
        </Edit>
      )}

      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        assetClassPriorities?.map((assetClass) => {
          return (
            <AssetClassPriority assetClass={assetClass} editing={editing} />
          );
        })
      )}
    </Priorities>
  );
};

export default Prioritization;
