import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData, deleteData } from '../../api';
import { loadModelAssetClasses } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { P, Edit } from '../../styled/GlobalElements';
import { SmallButton } from '../../styled/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import '@reach/dialog/styles.css';
import { Dialog } from '@reach/dialog';

const NameInput = styled.input`
  width: 40%;
  font-size: 27px;
  font-weight: 500;
  padding: 5px;
  margin: 10px;
  border: 1px solid;
`;

const AssetClassName = styled.span`
  font-size: 27px;
  font-weight: 500;
  margin: 10px;
  padding: 10px;
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
  const [showDialog, setShowDialog] = useState(false);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const finishEditing = () => {
    if (
      assetClassName !== assetClass.model_asset_class.name &&
      assetClassName.trim().length > 0
    ) {
      assetClass.model_asset_class.name = assetClassName;

      //? move this function to actions
      postData(
        `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
        assetClass,
      )
        .then(() => {
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
        toast.success(
          `'${assetClass.model_asset_class.name}' Deleted Successfully`,
          { autoClose: 3000 },
        );
      })
      .catch(() => {
        dispatch(loadModelAssetClasses());
        toast.error('Asset Class Deletion was Unsuccessful', {
          autoClose: 3000,
        });
      });
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <DeleteButton onClick={open}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </DeleteButton>

      <Dialog
        isOpen={showDialog}
        onDismiss={close}
        style={{ borderRadius: '1rem' }}
      >
        <P>
          Are you sure you want to delete{' '}
          <span style={{ fontWeight: 'bold' }}>{assetClassName}</span> ?
        </P>
        <p style={{ fontSize: '0.8rem' }}>
          All securities under this asset class would get deleted.
        </p>
        <br />
        <SmallButton onClick={handleDeleteAssetClass}>Delete</SmallButton>
        <SmallButton
          onClick={close}
          style={{ backgroundColor: 'transparent', color: 'black' }}
        >
          Cancel
        </SmallButton>
      </Dialog>

      {editName ? (
        <div>
          <NameInput
            type="text"
            value={assetClassName}
            onChange={(e) => setAssetClassName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && finishEditing()}
          />
          <SmallButton
            onClick={() => finishEditing()}
            style={{ position: 'relative', top: '-4px' }}
          >
            Done
          </SmallButton>
        </div>
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
