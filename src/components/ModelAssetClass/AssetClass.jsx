import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData, deleteData } from '../../api';
import { loadModelAssetClasses } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { P, Edit } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

const NameInput = styled.input`
  width: 60%;
  font-size: 1.7rem;
  font-weight: 500;
  padding: 10px;
  border: 1px solid;
`;

const AssetClassName = styled.span`
  font-size: 27px;
  font-weight: 500;
`;

export const DeleteButton = styled.button`
  background: #fff;
  float: right;
  position: relative;
  left: 39px;
  top: -35px;
  padding: 8px 11px 8px;
  z-index: 3;
  box-shadow: var(--box-shadow);
  border-bottom-right-radius: 4px;
  @media (max-width: 900px) {
    left: 20px;
    top: -20px;
  }
`;

const AssetClasses = ({ assetClass }) => {
  const dispatch = useDispatch();

  const [assetClassName, setAssetClassName] = useState(
    assetClass.model_asset_class.name,
  );
  const [editName, setEditName] = useState(false);

  const finishEditing = () => {
    if (
      assetClassName !== assetClass.model_asset_class.name &&
      assetClassName.trim().length > 0
    ) {
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
        })
        .catch(() => {
          // dispatch(loadModelAssetClasses()); //! when fails, the state doesn't changes to what it was
          toast.error(
            `${assetClass.model_asset_class.name} Asset Class Update Failed`,
            { autoClose: 3000 },
          );
        });
    } else {
      setAssetClassName(assetClass.model_asset_class.name);
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
      <DeleteButton onClick={handleDeleteAssetClass}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </DeleteButton>

      {editName ? (
        <NameInput
          type="text"
          value={assetClassName}
          onChange={(e) => setAssetClassName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
        />
      ) : (
        <P>
          <AssetClassName>{assetClassName}</AssetClassName>
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
