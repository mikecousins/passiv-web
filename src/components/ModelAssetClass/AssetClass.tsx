import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postData, deleteData } from '../../api';
import { ModelAssetClassDetailsType } from '../../types/modelAssetClass';
import NameInputAndEdit from '../NameInputAndEdit';
import { loadModelAssetClasses, loadModelPortfolios } from '../../actions';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { H2, P } from '../../styled/GlobalElements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from '@reach/dialog';
import { Button, TransparentButton } from '../../styled/Button';
import { selectModelAssetClasses } from '../../selectors/modelAssetClasses';
import { isNameDuplicate } from '../ModelPortfolio/utils/utils';

const DeleteButton = styled.button`
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

export const H2Margin = styled(H2)`
  font-size: 2.3rem;
  font-weight: 300;
  line-height: 1.3;
  text-align: center;
  margin: 0 auto 40px;
  color: black;
`;

export const ActionContainer = styled.div`
  text-align: center;
  margin-top: 30px;
  a {
    padding-right: 20px;
  }
`;

const Error = styled.div`
  color: red;
`;

type Props = {
  assetClass: ModelAssetClassDetailsType;
};
const AssetClasses = ({ assetClass }: Props) => {
  const dispatch = useDispatch();

  const assetClasses: ModelAssetClassDetailsType[] = useSelector(
    selectModelAssetClasses,
  );

  const listOfAssetClassNames = assetClasses.map(
    (astCls) => astCls.model_asset_class.name,
  );

  const [assetClassName, setAssetClassName] = useState(
    assetClass.model_asset_class.name,
  );
  const [editName, setEditName] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [duplicateNameError, setDuplicateNameError] = useState(false);

  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const handleInputChange = (name: string) => {
    const isDuplicate = isNameDuplicate(
      name,
      assetClass.model_asset_class.name,
      listOfAssetClassNames,
    );
    if (isDuplicate) {
      setDuplicateNameError(true);
    } else {
      setDuplicateNameError(false);
    }
    setAssetClassName(name);
  };

  const finishEditing = () => {
    const trimmedName = assetClassName?.trim();
    if (
      trimmedName !== assetClass.model_asset_class.name &&
      trimmedName &&
      trimmedName.length > 0
    ) {
      assetClass.model_asset_class.name = trimmedName;

      postData(
        `/api/v1/modelAssetClass/${assetClass.model_asset_class.id}`,
        assetClass,
      )
        .then(() => {
          dispatch(loadModelAssetClasses());
          dispatch(loadModelPortfolios());
        })
        .catch(() => {
          toast.error('Name update failed');
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
          `'${assetClass.model_asset_class.name}' deleted successfully`,
        );
      })
      .catch(() => {
        dispatch(loadModelAssetClasses());
        toast.error('Asset class deletion was unsuccessful');
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
        <P style={{ textAlign: 'center' }}>
          * All securities under this asset class will get deleted.
        </P>
        <ActionContainer>
          <Button onClick={handleDeleteAssetClass}>Delete</Button>
          <TransparentButton onClick={close}>Cancel</TransparentButton>
        </ActionContainer>
      </Dialog>

      <NameInputAndEdit
        value={assetClassName!}
        edit={editName}
        allowEdit={true}
        saveDisabled={duplicateNameError}
        onChange={(e: any) => {
          handleInputChange(e.target.value);
        }}
        onKeyPress={(e: any) =>
          e.key === 'Enter' && !duplicateNameError && finishEditing()
        }
        onClickDone={() => {
          finishEditing();
        }}
        onClickEdit={() => setEditName(true)}
        editBtnTxt={'Edit Name'}
        StyledName={StyledName}
      />
      {duplicateNameError && (
        <Error>
          An asset class with the same name already exists. Please use a
          different name.
        </Error>
      )}
    </React.Fragment>
  );
};

export default AssetClasses;
