import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postData, deleteData } from '../../api';
import { ModelAssetClassDetailsType } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import { loadModelAssetClasses, loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { A, H2 } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@reach/dialog';
import { Button } from '../../styled/Button';

export const DeleteButton = styled.button`
  background: #fff;
  float: right;
  position: relative;
  left: 39px;
  top: -35px;
  padding: 8px 11px 8px;
  box-shadow: var(--box-shadow);
  border-bottom-right-radius: 4px;
  @media (max-width: 900px) {
    left: 20px;
    top: -20px;
  }
`;

const StyledName = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const H2Margin = styled(H2)`
  font-size: 2.3rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  margin: 0 auto 40px;
  color: black;
`;

const ActionContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  a {
    padding-right: 20px;
  }
`;

type Props = {
  assetClass: ModelAssetClassDetailsType;
};
const AssetClasses = ({ assetClass }: Props) => {
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
      assetClassName!.trim().length > 0
    ) {
      assetClass.model_asset_class.name = assetClassName;

      //? move this function to actions
      postData(
        `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
        assetClass,
      )
        .then(() => {
          dispatch(loadModelAssetClasses());
          dispatch(loadModelPortfolios());
        })
        .catch(() => {
          // dispatch(loadModelAssetClasses()); //! when fails, the state doesn't changes to what it was
          toast.error(
            `${assetClass.model_asset_class.name} Asset Class Name Update Failed`,
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
        dispatch(loadModelPortfolios());
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
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <H2Margin>
          Are you sure you want to delete{' '}
          <span style={{ fontWeight: 'bold' }}>{assetClassName} *</span> ?
        </H2Margin>
        <p style={{ fontSize: '0.9rem', textAlign: 'center' }}>
          * All securities under this asset class would get deleted.
        </p>
        <ActionContainer>
          <A onClick={handleDeleteAssetClass}>Delete</A>
          <Button onClick={close}>Cancel</Button>
        </ActionContainer>
      </Dialog>

      <NameInputAndEdit
        value={assetClassName!}
        edit={editName}
        onChange={(e: any) => setAssetClassName(e.target.value)}
        onKeyPress={(e: any) => e.key === 'Enter' && finishEditing()}
        onClickDone={() => finishEditing()}
        onClickEdit={() => setEditName(true)}
        editBtnTxt={'Edit Name'}
        StyledName={StyledName}
      />
    </React.Fragment>
  );
};

export default AssetClasses;
