import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Combobox, ComboboxInput } from '@reach/combobox';
import { H2 } from '../../styled/GlobalElements';
import { postData } from '../../api/index';
const NewClassBox = styled.div`
  border: 1px solid #979797;
  width: 667px;
  height: 171px;
  box-sizing: border-box;
  padding: 30px 0 0 40px;
  margin: 40px auto auto 20px;
  font-style: italic;
`;
const StyledCombobox = styled(Combobox)`
  width: 500px;
  position: relative;
  z-index: 5;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;
const StyledInput = styled(ComboboxInput)`
  width: 500px;
  border-bottom: 1px solid;
  padding: 5px;
  margin-top: 20px;
  @media (max-width: 900px) {
    width: 81vw;
    margin-bottom: 20px;
  }
`;

export const AddAssetClass = () => {
  const [input, setInput] = useState('');

  // const loadOptions = () => {
  //   // setLoading(true);
  //   postData(`/api/v1/portfolioGroups/${groupId}/symbols`, {
  //     substring: input,
  //   })
  //     .then(response => {
  //       setMatchingSymbols(response.data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       dispatch(loadGroup({ ids: [groupId] }));
  //       setLoading(false);
  //     });
  // };

  const handleOnChange = (event: any) => {
    setInput(event.target.value);
    console.log(event.target.value);
  };
  return (
    <NewClassBox>
      <H2>New Asset Class </H2>
      <StyledCombobox>
        <StyledInput
          value={input}
          onChange={handleOnChange}
          placeholder="Search for security..."
        />
      </StyledCombobox>
    </NewClassBox>
  );
};
