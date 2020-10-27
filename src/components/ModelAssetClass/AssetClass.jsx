import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  updateAssetClass,
  deleteAssetClass,
} from '../../actions/modelAssetClass';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styled/Button';
import { P, Edit } from '../../styled/GlobalElements';

const AssetClasses = ({
  assetClass,
  onUpdateAssetClass,
  onDeleteAssetClass,
}) => {
  const [assetClassName, setAssetClassName] = useState(
    assetClass.model_asset_class.name,
  );
  const [editName, setEditName] = useState(false);
  const [selectToEdit, setSelectToEdit] = useState();

  const NameInput = styled.input`
  width: 60%;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 10px;
  border: 1px solid;
  focus
`;

  const onEditName = (id) => {
    setEditName(true);
    setSelectToEdit(id);
  };

  const finishEditing = (updatedName) => {
    assetClass.model_asset_class.name = updatedName;
    onUpdateAssetClass(assetClass);
    setEditName(false);
  };

  return (
    <React.Fragment>
      <Button
        style={{
          background: 'transparent',
          color: 'rgb(236, 88, 81)',
          padding: '5px',
          float: 'right',
          margin: '10px',
        }}
        onClick={() => onDeleteAssetClass(assetClass.model_asset_class.id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
      </Button>
      {editName && selectToEdit === assetClass.model_asset_class.id ? (
        <NameInput
          type="text"
          key={assetClass.model_asset_class.id}
          value={assetClassName}
          onChange={(e) => setAssetClassName(e.target.value)} //! Not working as it should
          onKeyPress={(e) => e.key === 'Enter' && finishEditing(e.target.value)}
        />
      ) : (
        <P>
          <span style={{ fontSize: '28px', fontWeight: 500 }}>
            {assetClass.model_asset_class.name}
          </span>
          <Edit onClick={() => onEditName(assetClass.model_asset_class.id)}>
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </P>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateAssetClass: (assetClass) => dispatch(updateAssetClass(assetClass)),
    onDeleteAssetClass: (id) => dispatch(deleteAssetClass({ id })),
  };
};

export default connect(null, mapDispatchToProps)(AssetClasses);
