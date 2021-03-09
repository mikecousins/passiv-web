import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectRouter } from '../selectors/router';
import ModelPortfolio from '../components/ModelPortfolio/ModelPortfolio';
import { H1 } from '../styled/GlobalElements';
import { StyledP } from './ModelAssetClassPage';
import { getData } from '../api';
import SharedModelPortfolio from '../components/ModelPortfolio/SharedModelPortfolio';
import { ModelPortfolioDetailsType } from '../types/modelPortfolio';

const ModelPortfolioPage = () => {
  const history = useHistory();

  const router = useSelector(selectRouter);

  const [isSharedModel, setIsSharedModel] = useState(false);
  const [sharedModel, setSharedModel] = useState<ModelPortfolioDetailsType>();

  const path = router?.location?.pathname.split('/');
  let shareId = path[5];
  const modelId = router.location.pathname.split('/')[3];

  useEffect(() => {
    // check if the model is a shared model
    if (path[4] === 'share' && shareId) {
      getData(`/api/v1/modelPortfolio/${modelId}/share/${shareId}`)
        .then((res) => {
          setIsSharedModel(true);
          setSharedModel(res.data);
        })
        .catch((err) => {
          setIsSharedModel(false);
          history.replace('/app/login');
        });
    }
  }, []);

  return (
    <React.Fragment>
      <H1>{isSharedModel ? 'Shared Model' : 'Model Portfolio'}</H1>
      <StyledP>
        Create a model portfolio by using asset classes you define. Once you're
        done you can apply it to one of your portfolio groups, share with your
        friends or use later.
      </StyledP>
      {isSharedModel ? (
        sharedModel !== undefined && (
          <SharedModelPortfolio model={sharedModel} shareId={shareId} />
        )
      ) : (
        <ModelPortfolio />
      )}
    </React.Fragment>
  );
};

export default ModelPortfolioPage;
