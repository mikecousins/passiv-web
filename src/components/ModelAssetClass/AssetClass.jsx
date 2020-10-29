import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData, deleteData } from '../../api';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../../styled/Button';
import { P, Edit } from '../../styled/GlobalElements';
import { loadModelAssetClasses } from '../../actions';

const NameInput = styled.input`
  width: 60%;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 10px;
  border: 1px solid;
`;

const AssetClasses = ({ assetClass }) => {
  const dispatch = useDispatch();

  const [assetClassName, setAssetClassName] = useState(
    assetClass.model_asset_class.name,
  );
  const [editName, setEditName] = useState(false);

  const finishEditing = () => {
    //! Check for empty asset class name
    if (assetClassName !== assetClass.model_asset_class.name) {
      assetClass.model_asset_class.name = assetClassName;
      console.log('updated Asset Class:', assetClass);
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
    }
    setEditName(false);
  };

  const handleDeleteAssetClass = () => {
    deleteData(`/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`)
      .then(() => {
        dispatch(loadModelAssetClasses());
        toast.success('Asset Class Deleted Successfully', { autoClose: 3000 });
      })
      .catch(() => {
        dispatch(loadModelAssetClasses());
        toast.error('Asset Class Deletion was Unsuccessful', {
          autoClose: 3000,
        });
      });
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
        onClick={handleDeleteAssetClass}
      >
        <FontAwesomeIcon icon={faTrashAlt} size="lg" />
      </Button>
      {editName ? (
        <NameInput
          type="text"
          value={assetClassName}
          onChange={(e) => setAssetClassName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
        />
      ) : (
        <P>
          <span style={{ fontSize: '28px', fontWeight: 500 }}>
            {assetClassName}
          </span>
          <Edit onClick={() => setEditName(true)}>
            <FontAwesomeIcon icon={faPen} />
            Edit
          </Edit>
        </P>
      )}
    </React.Fragment>
  );
};

export default AssetClasses;
