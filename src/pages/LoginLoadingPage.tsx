import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { selectShowLoginLoading } from '../selectors/app';
import { selectShowQuestradeOffer } from '../selectors/subscription';
import { H1 } from '../styled/GlobalElements';
import { push } from 'connected-react-router';
import UpgradeIdea from '../components/UpgradeIdea';

type Props = {
  redirectPath: string;
};

const LoginLoadingPage = ({ redirectPath }: Props) => {
  const showLoginLoading = useSelector(selectShowLoginLoading);
  const showQuestradeOffer = useSelector(selectShowQuestradeOffer);
  const dispatch = useDispatch();
  const [doneLoading, setDoneLoading] = useState(false);

  useEffect(() => {
    if (showLoginLoading === false) {
      setTimeout(() => {
        setDoneLoading(true);
      }, 1000);
    }
  }, [showLoginLoading]);

  if (doneLoading) {
    if (showQuestradeOffer) {
      return <UpgradeIdea showSkipLink={true} skipLocation={redirectPath} />;
    } else {
      dispatch(push(redirectPath));
      return (
        <H1>
          Loading your dashboard <FontAwesomeIcon icon={faSpinner} spin />
        </H1>
      );
    }
  } else {
    return (
      <H1>
        Loading your dashboard <FontAwesomeIcon icon={faSpinner} spin />
      </H1>
    );
  }
};

export default LoginLoadingPage;
