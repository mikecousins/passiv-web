import styled from '@emotion/styled';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@reach/dialog';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectGroupsUsingAModel } from '../../selectors/modelPortfolios';
import { Button, TransparentButton } from '../../styled/Button';
import { GroupData } from '../../types/group';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import { ActionContainer, H2Margin } from '../ModelAssetClass/AssetClass';

const DeleteModelExplanation = styled.div`
  font-size: 1.2rem;
  text-align: center;
  ul {
    margin-top: 20px;
    li {
      margin-bottom: 10px;
    }
  }
`;

type Props = {
  model: ModelPortfolioDetailsType;
  open: boolean;
  hideDialog: () => void;
  deleteModel: () => void;
};

const DeleteModelDialog = ({ model, open, hideDialog, deleteModel }: Props) => {
  const groupsUsingModel = useSelector(selectGroupsUsingAModel);
  const modelId = model.model_portfolio.id;

  let groups: GroupData[] = [];
  if (modelId) {
    groups = groupsUsingModel?.[modelId]?.groups;
  }

  return (
    <div>
      <Dialog
        isOpen={open}
        onDismiss={hideDialog}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <H2Margin>
          Are you sure you want to delete{' '}
          <span style={{ fontWeight: 'bold' }}>
            {model?.model_portfolio.name}
          </span>{' '}
          ?
        </H2Margin>
        {groups?.length > 0 && (
          <DeleteModelExplanation>
            <FontAwesomeIcon icon={faExclamationTriangle} /> The following
            groups are using this model and would get reset:
            <ul>
              {groups.map((group) => {
                return <li key={group.id}>{group.name}</li>;
              })}
            </ul>
          </DeleteModelExplanation>
        )}

        <ActionContainer>
          <Button onClick={deleteModel}>Delete</Button>
          <TransparentButton onClick={hideDialog}>Cancel</TransparentButton>
        </ActionContainer>
      </Dialog>
    </div>
  );
};

export default DeleteModelDialog;
