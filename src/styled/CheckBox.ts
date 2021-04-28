import styled from '@emotion/styled';

type CheckBoxProps = {
  disabled?: boolean;
};

export const CheckBox = styled.div<CheckBoxProps>`
  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: white;
    border: ${(props) => (props.disabled ? '1.5px solid grey' : '1px solid')};
    border-radius: 3px;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: ${(props) => (props.disabled ? '' : '#ccc')};
  }

  /* When the checkbox is checked, add a black background */
  .container input:checked ~ .checkmark {
    background-color: ${(props) => (props.disabled ? 'grey' : 'black')};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 7.5px;
    top: 2px;
    width: 8px;
    height: 14px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
