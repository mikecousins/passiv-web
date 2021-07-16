import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import {
  faCheckCircle,
  faClone,
  faEllipsisV,
  faShareSquare,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@reach/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  loadAccountList,
  loadGroup,
  loadGroupsList,
  loadModelPortfolios,
} from '../../actions';
import { deleteData, postData } from '../../api';
import { H2 } from '../../styled/GlobalElements';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { InputBox, ReadOnlyInput } from '../SettingsManager/APIAccessSettings';
import { selectReferralCode } from '../../selectors/referrals';
import Grid from '../../styled/Grid';
import {
  faFacebook,
  faReddit,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { ModelPortfolioDetailsType } from '../../types/modelPortfolio';
import DeleteModelDialog from './DeleteModelDialog';
import { selectGroupsUsingAModel } from '../../selectors/modelPortfolios';
import { GroupData } from '../../types/group';
import { push, replace } from 'connected-react-router';
import { SmallTransparentButton } from '../../styled/Button';

const EllipsisButton = styled.button`
  align-items: center;
  text-align: center;
  background: none;
  color: var(--brand-blue);
  font-size: 1.1rem;
  font-weight: 300;
  padding: 8px 16px;
  background: #fff;
  &:hover {
    border: 1px solid var(--brand-blue);
    border-radius: 4px;
    background: var(--brand-blue);
    color: #fff;
  }
`;
const Options = styled.ul`
  border: 1px solid var(--brand-blue);
  position: absolute;
  padding: 22px 20px 24px;
  background: #c3e7ff;
  margin: 10px 16px;
  width: max-content;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  font-size: 18px;
  svg {
    margin-right: 10px;
  }
  li {
    margin-bottom: 10px;
  }
  button {
    font-weight: 400;
    &:hover {
      color: var(--brand-blue);
    }
  }
`;

const Delete = styled.button`
  &:hover {
    color: red !important;
    * {
      color: red !important;
    }
  }
`;

const URLInput = styled(ReadOnlyInput)`
  font-size: 20px;
`;

const SocialMedia = styled(Grid)`
  margin: 30px auto;
  svg {
    &:hover {
      color: var(--brand-green);
    }
  }
`;

type CopyButtonProps = {
  copied: boolean;
};

export const CopyButton = styled(SmallTransparentButton)<CopyButtonProps>`
  background-color: ${(props) =>
    props.copied ? 'var(--brand-green)' : 'transparent'};
  color: ${(props) => (props.copied ? 'white' : 'var(--brand-green)')};
`;

type Props = {
  model: ModelPortfolioDetailsType;
  shareModel: boolean;
};

const MoreOptions = ({ model, shareModel }: Props) => {
  const dispatch = useDispatch();
  const node: any = useRef(null);

  const referralCode = useSelector(selectReferralCode);
  const groupsUsingModel = useSelector(selectGroupsUsingAModel);
  const [showOptions, setShowOptions] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const modelId = model.model_portfolio.id;

  let groups: GroupData[] = [];
  if (modelId) {
    groups = groupsUsingModel?.[modelId]?.groups;
  }

  const handleClick = (e: Event) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setShowOptions(false);
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  const SHARE_URL = `https://app.passiv.com/shared-model-portfolio/${modelId}?share=${referralCode}`;
  if (!modelId) {
    return <div></div>;
  }

  const handleCloneModel = () => {
    // create a new model
    postData('api/v1/modelPortfolio', {})
      .then((res) => {
        const modelId = res.data.model_portfolio.id;
        model.model_portfolio.share_portfolio = false;
        model.model_portfolio.total_assigned_portfolio_groups = 0;

        // post cloned model data to it
        postData(`api/v1/modelPortfolio/${modelId}`, model)
          .then(() => {
            dispatch(loadModelPortfolios());
            dispatch(push(`/models`));
            toast.success('Created a duplicate model successfully');
          })
          .catch((err) => {
            toast.error('Unable to duplicate the model');
          });
      })
      .catch(() => toast.error('Unable to duplicate the model'));
  };

  const handleDeleteModel = () => {
    deleteData(`/api/v1/modelPortfolio/${modelId}`)
      .then(() => {
        dispatch(loadModelPortfolios());
        dispatch(loadAccountList());
        dispatch(loadGroupsList());
        if (groups !== undefined) {
          dispatch(loadGroup({ ids: groups.map((group) => group.id) }));
        }
        toast.success('Deleted the model successfully');
        dispatch(replace(`/models`));
      })
      .catch(() => {
        toast.error('Unable to delete the model');
      });
  };

  const title = 'Check out my model portfolio on Passiv.com';

  return (
    <div ref={node} className="tour-more-options">
      <EllipsisButton
        onClick={() => setShowOptions(!showOptions)}
        title="more options"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </EllipsisButton>
      {showOptions && (
        <Options>
          <li>
            <button onClick={handleCloneModel}>
              <FontAwesomeIcon icon={faClone} />
              <span>Duplicate</span>
            </button>
          </li>
          {shareModel && (
            <li>
              <button onClick={() => setShowShareDialog(true)}>
                <FontAwesomeIcon icon={faShareSquare} />
                <span>Share</span>
              </button>
            </li>
          )}
          <li>
            <Delete onClick={() => setDeleteDialog(true)}>
              <FontAwesomeIcon icon={faTrashAlt} />
              <span>Delete</span>
            </Delete>
          </li>
        </Options>
      )}

      <Dialog
        isOpen={showShareDialog}
        onDismiss={() => {
          setShowShareDialog(false);
          setCopied(false);
        }}
        aria-labelledby="dialog1Title"
        aria-describedby="dialog1Desc"
      >
        <button
          onClick={() => {
            setShowShareDialog(false);
            setCopied(false);
          }}
          style={{ float: 'right' }}
        >
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>
        <div>
          <H2 style={{ marginTop: '30px' }}>Share Model</H2>
          <SocialMedia columns="100px 100px 100px 100px">
            <button>
              <a
                target="_blank"
                href={`https://twitter.com/intent/tweet/?text=${title}&url=${SHARE_URL}`}
                rel="noopener noreferrer"
                className="twitter"
              >
                <FontAwesomeIcon icon={faTwitter} size="3x" color="#1DA1F2" />
              </a>
            </button>
            <button>
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${SHARE_URL}`}
                rel="noopener noreferrer"
                className="fb"
              >
                <FontAwesomeIcon icon={faFacebook} size="3x" color="#4267B2" />
              </a>
            </button>
            <button>
              <a
                target="_blank"
                href={`https://www.reddit.com/submit?url=${SHARE_URL}&title=${title}`}
                rel="noopener noreferrer"
                className="reddit"
              >
                <FontAwesomeIcon icon={faReddit} size="3x" color="#ff4500" />
              </a>
            </button>
          </SocialMedia>
          <Grid columns="4fr auto">
            <InputBox>
              <URLInput value={SHARE_URL} readOnly={true} />
            </InputBox>
            <div>
              <CopyToClipboard
                text={SHARE_URL}
                onCopy={() => {
                  setCopied(true);
                }}
              >
                <div>
                  <CopyButton copied={copied}>
                    {copied ? 'Copied' : 'Copy'}{' '}
                    {copied && <FontAwesomeIcon icon={faCheckCircle} />}
                  </CopyButton>
                </div>
              </CopyToClipboard>
            </div>
          </Grid>
        </div>
      </Dialog>

      <DeleteModelDialog
        model={model}
        open={deleteDialog}
        hideDialog={() => setDeleteDialog(false)}
        deleteModel={handleDeleteModel}
      />
    </div>
  );
};

export default MoreOptions;
