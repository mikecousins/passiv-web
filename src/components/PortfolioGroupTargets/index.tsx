import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadGroup } from '../../actions';
import OrderTargetAllocations from '../PortfolioGroupSettings/OrderTargetAllocations';
import {
  selectCurrentGroupId,
  selectCurrentGroupTargetInitialized,
  selectCurrentGroupPositions,
  selectCurrentGroupInfoLoading,
  selectCurrentGroupTarget,
} from '../../selectors/groups';
import { Button } from '../../styled/Button';
import {
  H2,
  H3,
  P,
  OverlayContainer,
  DisabledBox,
} from '../../styled/GlobalElements';
import { postData } from '../../api';
import styled from '@emotion/styled';
import ShadowBox from '../../styled/ShadowBox';
import LoadingOverlay from '../LoadingOverlay';
import TargetSelector from './TargetSelector';
import { selectIsEditMode } from '../../selectors/router';
import Tour from '../Tour/Tour';

const TOUR_STEPS = [
  {
    target: '.tour-import-holdings',
    content:
      'Import your holdings automatically from your brokerage account. All your holdings get imported and get assigned with an actual percentage automatically. Start by clicking the Import button.',
  },
  {
    target: '.tour-build-portfolio',
    content:
      'Build your portfolio manually by adding your securities one-by-one. Start by clicking the Build button.',
  },
];

export const TargetContainer = styled.form`
  h2 {
    margin-bottom: 20px;
  }
  min-height: 200px;
`;

export const Container2Column = styled.div`
  @media (min-width: 900px) {
    display: flex;
    justify-content: space-between;
    > div {
      width: 49%;
    }
  }
`;

const H3LowProfile = styled(H3)`
  line-height: 1.3em;
  height: 3em;
`;

const CenteredDiv = styled.div`
  text-align: center;
  padding-top: 10px;
`;

const h2DarkStyle = {
  color: 'white',
  paddingBottom: '20px',
};

const h3DarkStyle = {
  color: 'white',
  paddingBottom: '10px',
};

const pDarkStyle = {
  color: 'white',
};

type Props = {
  error: any | null;
};

const PortfolioGroupTargets = ({ error }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showImportOverlay, setShowImportOverlay] = useState(false);
  const [showResetOverlay, setShowResetOverlay] = useState(false);
  const [model, setModel] = useState<string>();

  const groupId = useSelector(selectCurrentGroupId);
  const target = useSelector(selectCurrentGroupTarget);
  const targetInitialized = useSelector(selectCurrentGroupTargetInitialized);
  const positions = useSelector(selectCurrentGroupPositions);
  const loadingGroupInfo = useSelector(selectCurrentGroupInfoLoading);
  const edit = useSelector(selectIsEditMode);

  const dispatch = useDispatch();

  const importDisabled = () => {
    return (
      positions !== null && positions !== undefined && positions.length === 0
    );
  };

  const modelChoices = [
    {
      id: 'IMPORT',
      name: 'Import your current holdings as a target',
      tourClass: 'tour-import-holdings',
      button: (
        <React.Fragment>
          <Button onClick={() => importTarget()} disabled={importDisabled()}>
            Import
          </Button>
          {importDisabled() && (
            <DisabledBox>
              Importing a target is not available because there are no open
              positions in your account.
            </DisabledBox>
          )}
        </React.Fragment>
      ),
    },
    {
      id: 'MANUAL',
      name: 'Build your target portfolio manually',
      tourClass: 'tour-build-portfolio',
      button: <Button onClick={() => setModel('MANUAL')}>Build</Button>,
    },
  ];

  useEffect(() => {
    setModel(undefined);
  }, [groupId, target, targetInitialized, error]);

  useEffect(() => {
    setShowImportOverlay(false);
    setShowResetOverlay(false);
  }, [targetInitialized]);

  const importTarget = () => {
    setLoading(true);
    setShowImportOverlay(true);
    postData('/api/v1/portfolioGroups/' + groupId + '/import/', {})
      .then(() => {
        setLoading(false);
        dispatch(loadGroup({ ids: [groupId] }));
      })
      .catch(() => {
        setLoading(false);
        setShowImportOverlay(false);
      });
  };

  const generateTargetForm = (lockable: boolean) => {
    let form = (
      <TargetSelector
        target={target}
        lockable={lockable}
        onReset={() => setShowResetOverlay(true)}
      />
    );
    if (
      !targetInitialized ||
      (!loading &&
        target &&
        target.filter((t) => t.is_supported === true).length === 0)
    ) {
      form = <ShadowBox>{form}</ShadowBox>;
    }
    return form;
  };

  const renderTargetChooser = () => {
    switch (model) {
      case 'CHOOSE':
        return <P>This shouldn't be visible ever.</P>;
      case 'IMPORT':
        return <P>This shouldn't be visible ever.</P>;
      case 'MANUAL':
        return generateTargetForm(false);
      default:
        return <P>This shouldn't be visible ever.</P>;
    }
  };

  const excludedErrorCodes = [2001];
  let excludedError = null;

  if (error !== null) {
    let errorCode = Number(error.code);
    excludedError = excludedErrorCodes.includes(errorCode);
  }

  if (error !== null && !excludedError) {
    return null;
  }

  // show a spinner if we don't have our data yet
  if (loadingGroupInfo) {
    return (
      <OverlayContainer>
        <ShadowBox>
          <TargetContainer>
            <H2>Target Portfolio</H2>
            <span>
              <FontAwesomeIcon icon={faSpinner} spin />
            </span>
          </TargetContainer>
        </ShadowBox>
        <LoadingOverlay />
      </OverlayContainer>
    );
  }

  // help them set a target if they don't have one yet
  if (
    !(targetInitialized && target) &&
    !loading &&
    ((target &&
      target.filter((t) => t.is_supported === true && t.is_excluded === false)
        .length === 0) ||
      !target)
  ) {
    return (
      <OverlayContainer>
        <ShadowBox background="#2a2d34">
          <H2 style={h2DarkStyle}>Target Portfolio</H2>
          {!model ? (
            <React.Fragment>
              <Tour steps={TOUR_STEPS} />
              <P style={pDarkStyle}>
                A target portfolio is how you tell Passiv what you want. You
                will need to choose which securities you want to hold and how
                you want your assets divided across those securities. Passiv
                will perform calculations to figure out what trades need to be
                made in order to follow your target portfolio.
              </P>
              <P style={pDarkStyle}>
                There is no target portfolio set for this account. Please choose
                one of the following options:
              </P>
              <Container2Column>
                {modelChoices.map((m) => (
                  <ShadowBox key={m.id}>
                    <H3LowProfile className={m.tourClass}>
                      {m.name}
                    </H3LowProfile>
                    <CenteredDiv>{m.button}</CenteredDiv>
                  </ShadowBox>
                ))}
              </Container2Column>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <H3 style={h3DarkStyle}>
                {modelChoices.find((m: any) => m.id === model)!.name}
              </H3>
              {renderTargetChooser()}
              <Button onClick={() => setModel(undefined)}>Back</Button>
            </React.Fragment>
          )}
        </ShadowBox>
        {(showImportOverlay || showResetOverlay) && <LoadingOverlay />}
      </OverlayContainer>
    );
  }

  return (
    <OverlayContainer>
      <ShadowBox>
        <TargetContainer>
          <H2>Target Portfolio</H2>
          <OrderTargetAllocations edit={edit} />
          {loading ? (
            <P>
              Importing targets... <FontAwesomeIcon icon={faSpinner} spin />
            </P>
          ) : (
            generateTargetForm(true)
          )}
        </TargetContainer>
      </ShadowBox>
      {(showImportOverlay || showResetOverlay) && <LoadingOverlay />}
    </OverlayContainer>
  );
};

export default PortfolioGroupTargets;
