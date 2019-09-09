import styled from '@emotion/styled';
import AsyncSelect from 'react-select/async';

const SymbolSelector = styled(AsyncSelect)`
  width: 500px;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;

export default SymbolSelector;
