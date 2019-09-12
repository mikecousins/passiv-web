import React from 'react';
import styled from '@emotion/styled';
import AlpacaLogo from '../../assets/images/alpaca-logo.png';

export const DemoStyle = styled.div`
  display: inline-block;
  margin: 0 0 0 20px;
  padding-top: 17px;
  text-align: left;
  font-weight: 700;
  @media (max-width: 900px) {
    padding-top: 10px;
    padding-right: 20px;
  }
`;

const LogoContainer = styled.div`
  display: inline-block;
  height: 30px;
  vertical-align: middle;
  padding-left: 10px;
  img {
    height: 100%;
  }
`;

// const AlpacaLogo = (
//   <svg width="142" height="41" viewBox="0 0 142 41" fill="none">
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M52.1751 26.7H59.8196L60.8587 30H66L59.0027 9H52.9973L46 30H51.1448L52.1751 26.7ZM56.0061 14.4893L58.4202 22.2001H53.5921L56.0061 14.4893Z" fill="white"></path>
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M68 9H72V30H68V9Z" fill="white"></path>
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M83.8916 30.5289C87.7887 30.5289 91 27.1466 91 22.7644C91 18.3823 87.7869 15 83.8916 15C81.8998 15 80.4417 15.6765 79.4608 16.7934V15.4108H75V36H79.4608V28.7355C80.4417 29.8524 81.8998 30.5289 83.8916 30.5289ZM83.0044 19.1759C85.0528 19.1759 86.5392 20.5585 86.5392 22.7644C86.5392 24.9704 85.0528 26.353 83.0044 26.353C80.956 26.353 79.4697 24.9704 79.4697 22.7644C79.4697 20.5585 80.956 19.1759 83.0044 19.1759Z" fill="white"></path>
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M104.539 30.5768H109V15.4232H104.539V16.8478C103.558 15.697 102.1 15 100.108 15C96.2113 15 93 18.4849 93 23C93 27.5151 96.2201 31 100.108 31C102.1 31 103.558 30.303 104.539 29.1522V30.5768ZM101.004 19.3026C103.053 19.3026 104.539 20.7271 104.539 23C104.539 25.2729 103.053 26.6974 101.004 26.6974C98.956 26.6974 97.4697 25.2729 97.4697 23C97.4697 20.7271 98.956 19.3026 101.004 19.3026Z" fill="white"></path>
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M111 22.9982C111 18.4841 114.451 15 119.098 15C122.062 15 124.691 16.5449 126 18.8785L122.004 21.1814C121.485 20.1209 120.384 19.4853 119.04 19.4853C117.053 19.4853 115.59 20.9095 115.59 23C115.59 25.0905 117.057 26.5147 119.04 26.5147C120.384 26.5147 121.516 25.8791 122.004 24.8186L126 27.0909C124.685 29.4551 122.088 31 119.098 31C114.453 30.9982 111 27.5141 111 22.9982Z" fill="white"></path>
//     <path class="text" fill-rule="evenodd" clip-rule="evenodd" d="M137.546 30.5768H142V15.4232H137.537V16.8478C136.555 15.697 135.096 15 133.103 15C129.206 15 126 18.4849 126 23C126 27.5151 129.222 31 133.112 31C135.105 31 136.564 30.303 137.546 29.1522V30.5768ZM134.009 19.3026C136.058 19.3026 137.546 20.7271 137.546 23C137.546 25.2729 136.058 26.6974 134.009 26.6974C131.959 26.6974 130.472 25.2729 130.472 23C130.472 20.7271 131.959 19.3026 134.009 19.3026Z" fill="white"></path>
//     <path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M41 20.5056C40.9946 9.32282 32.041 0.204327 20.8685 0.00337749C9.69596 -0.197572 0.420733 8.59306 0.0138439 19.7684C-0.393046 30.9438 8.21831 40.3867 19.3758 41C17.8137 39.9485 17.6404 37.4949 17.6404 36.0385V19.5698C12.5478 19.9869 12.7037 15.3058 12.7037 15.3058L15.77 14.1106C15.5747 13.3907 15.6065 12.628 15.8611 11.9269C16.6019 9.85885 20.3425 9.48206 20.3425 9.48206L19.5632 7.14064C21.2269 6.77611 22.3652 8.54269 22.3652 8.54269V6.36076C24.8589 6.41333 25.0148 10.3653 25.0148 10.3653C26.442 11.2767 28.0181 12.7453 28.3981 15.7737C28.6258 17.5981 30.2685 31.8972 31.0478 33.8724C31.5399 35.1202 32.8603 35.8002 33.7674 36.1507C38.3619 32.2553 41.0078 26.5318 41 20.5056Z" fill="white"></path>
//     <path class="icon" fill-rule="evenodd" clip-rule="evenodd" d="M17 15H18.8516C19.7441 15 20 14 20 14H18.0215C17.1269 14 17 15 17 15Z" fill="white"></path>
//   </svg>
// )

const Demo = () => (
  <DemoStyle>
    This demo is powered by{' '}
    <LogoContainer>
      <a href="https://alpaca.markets/" target="_blank">
        <img src={AlpacaLogo} />
      </a>
    </LogoContainer>
  </DemoStyle>
);

export default Demo;