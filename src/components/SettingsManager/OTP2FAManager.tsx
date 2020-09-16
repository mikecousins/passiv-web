import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsDemo,
  select2FAEnabled,
  selectOTP2FAFeature,
} from '../../selectors';
import { OptionsTitle } from '../../styled/GlobalElements';

import { loadSettings } from '../../actions';
import { postData, deleteData } from '../../api';

import {
  InputContainer,
  MiniInputNonFormik,
  Active2FABadge,
  Disabled2FABadge,
  ErrorMessage,
} from '../../styled/TwoFAManager';

const OTP2FAManager = () => {
  const isDemo = useSelector(selectIsDemo);
  const OTP2FAFeatureEnabled = useSelector(selectOTP2FAFeature);
  const is2FAEnabled = useSelector(select2FAEnabled);
  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = useState('');
  const [secret2FA, setSecret2FA] = useState();
  const [editing2FA, setEditing2FA] = useState(false);
  const [confirming2FA, setConfirming2FA] = useState(false);
  const [error2FA, setError2FA] = useState();
  const [loading2FA, setLoading2FA] = useState(false);

  const startEditing2FA = () => {
    setEditing2FA(true);
    setVerificationCode('');
    setError2FA(null);
  };

  const cancelEditing2FA = () => {
    setEditing2FA(false);
    setConfirming2FA(false);
    setVerificationCode('');
    setError2FA(null);
    setLoading2FA(false);
  };

  const initOTPAuth = () => {
    setLoading2FA(true);
    setError2FA(null);
    postData('/api/v1/auth/opt/', {})
      .then(response => {
        setConfirming2FA(true);
        setLoading2FA(false);
        setSecret2FA(response.data.mfa_required.secret);
      })
      .catch(error => {
        setError2FA(error.response && error.response.data.detail);
        setLoading2FA(false);
      });
  };

  const submitCode = () => {
    setLoading2FA(true);
    setError2FA(null);
    postData('/api/v1/auth/otpVerify/', {
      token: verificationCode,
    })
      .then(() => {
        dispatch(loadSettings());
        cancelEditing2FA();
      })
      .catch(error => {
        setError2FA(error.response.data.detail);
        setLoading2FA(false);
      });
  };

  const disable2FA = () => {
    setLoading2FA(true);
    deleteData('/api/v1/auth/opt/')
      .then(() => {
        setLoading2FA(false);
        dispatch(loadSettings());
      })
      .catch(error => {
        setError2FA(error.response.data.detail);
        setLoading2FA(false);
      });
  };

  let error2FAMessage = null;
  if (error2FA != null) {
    error2FAMessage = <ErrorMessage>{error2FA}</ErrorMessage>;
  }

  let opt_2fa = null;

  //
  // let sms_2fa = null;
  // if (is2FAEnabled) {
  //   sms_2fa = (
  //     <React.Fragment>
  //       <Active2FABadge>Active</Active2FABadge>
  //       <Edit onClick={() => !isDemo && disable2FA()} disabled={isDemo}>
  //         {loading2FA ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Disable'}
  //       </Edit>
  //       {error2FAMessage}
  //       <div>
  //         <Span>
  //           Your verified phone number: <strong>{phoneNumber}</strong>
  //         </Span>
  //       </div>
  //     </React.Fragment>
  //   );
  // } else {
  //   if (editing2FA === false) {
  //     sms_2fa = (
  //       <React.Fragment>
  //         <Disabled2FABadge>Not Enabled</Disabled2FABadge>
  //         <Edit
  //           onClick={() => !isDemo && startEditing2FA()}
  //           disabled={isDemo || loading2FA}
  //         >
  //           Enable
  //         </Edit>
  //         <DisabledBox>
  //           Protect your account by enabling 2-factor authentication with your
  //           phone.
  //         </DisabledBox>
  //       </React.Fragment>
  //     );
  //   } else {
  //     if (!confirming2FA) {
  //       sms_2fa = (
  //         <React.Fragment>
  //           <P>
  //             Activating this option will require you to enter a 6-digit code
  //             each time you login. If you lose access to your phone number, you
  //             will be unable to login in the future.
  //           </P>
  //           <P>Just verify your phone number:</P>
  //           <MiniInputNonFormik
  //             value={candidatePhoneNumber}
  //             placeholder={'Your phone number'}
  //             onChange={e => setCandidatePhoneNumber(e.target.value)}
  //           />
  //           {error2FA}
  //           <Edit
  //             onClick={() => !isDemo && cancelEditing2FA()}
  //             disabled={isDemo}
  //           >
  //             Cancel
  //           </Edit>
  //           <Button onClick={verifyPhoneNumber}>
  //             {loading2FA ? (
  //               <FontAwesomeIcon icon={faSpinner} spin />
  //             ) : (
  //               'Submit'
  //             )}
  //           </Button>
  //         </React.Fragment>
  //       );
  //     } else {
  //       sms_2fa = (
  //         <React.Fragment>
  //           <MiniInputNonFormik
  //             value={verificationCode}
  //             placeholder={'Your verification code'}
  //             onChange={e => setVerificationCode(e.target.value)}
  //           />
  //           {error2FA}
  //           <Edit
  //             onClick={() => !isDemo && cancelEditing2FA()}
  //             disabled={isDemo}
  //           >
  //             Cancel
  //           </Edit>
  //           <Button onClick={submitCode}>
  //             {loading2FA ? (
  //               <FontAwesomeIcon icon={faSpinner} spin />
  //             ) : (
  //               'Verify'
  //             )}
  //           </Button>
  //         </React.Fragment>
  //       );
  //     }
  //   }
  // }

  return (
    <React.Fragment>
      {OTP2FAFeatureEnabled && (
        <InputContainer>
          <OptionsTitle>OPT 2FA:</OptionsTitle> {opt_2fa}
        </InputContainer>
      )}
    </React.Fragment>
  );
};

export default OTP2FAManager;
