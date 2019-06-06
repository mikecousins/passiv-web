import styled from '@emotion/styled';
import AsyncSelect from 'react-select/async';

const SymbolSelector = styled(AsyncSelect)`
  width: 500px;
  @media (max-width: 900px) {
    width: 100%;
  }
  padding-left: 30px;
`;

export default SymbolSelector;
