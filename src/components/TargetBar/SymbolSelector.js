import styled from '@emotion/styled';
import AsyncSelect from 'react-select/lib/Async';

const SymbolSelector = styled(AsyncSelect)`
  width: 500px;
  @media (max-width: 900px) {
  	width: 100%;
  }
`;

export default SymbolSelector;
