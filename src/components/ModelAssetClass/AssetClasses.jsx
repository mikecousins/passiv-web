import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateAssetClassName, deleteAssetClass } from '../../actions';

import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styled/Button';
import { P, Edit } from '../../styled/GlobalElements';

const AssetClasses = ({ assetClass, onNameChange, onDeleteAssetClass }) => {
  const [assetClassName, setAssetClassName] = useState(assetClass.name);
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

  const finishEditing = (name, id) => {
    onNameChange(name, id);
    setEditName(false);
  };

  return (
    <>
      <Button
        style={{
          background: 'transparent',
          color: 'rgb(236, 88, 81)',
          padding: '5px',
          float: 'right',
          margin: '10px',
        }}
        onClick={() => onDeleteAssetClass(assetClass.id)}
      >
        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
      </Button>
      {editName && selectToEdit === assetClass.id ? (
        <NameInput
          type="text"
          value={assetClassName}
          key={assetClass.id}
          onChange={(e) => setAssetClassName(e.target.value)} //! Not working as it should
          onKeyPress={(e) =>
            e.key === 'Enter' && finishEditing(e.target.value, assetClass.id)
          }
        />
      ) : (
        <P>
          <span style={{ fontSize: '28px', fontWeight: 500 }}>
            {assetClass.name}
          </span>
          <Edit onClick={() => onEditName(assetClass.id)}>
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </P>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name, id) =>
      dispatch(updateAssetClassName({ assetClassId: id, updatedName: name })),
    onDeleteAssetClass: (id) => dispatch(deleteAssetClass({ id })),
  };
};

export default connect(null, mapDispatchToProps)(AssetClasses);
