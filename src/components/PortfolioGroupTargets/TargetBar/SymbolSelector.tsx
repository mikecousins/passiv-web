import styled from '@emotion/styled';
import { Combobox } from '@reach/combobox';

const SymbolSelector = styled(Combobox)`
  width: 500px;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;

export default SymbolSelector;
