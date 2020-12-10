import styled from '@emotion/styled';
import { Field } from 'formik';

// Forms, inputs, buttons

export const Form = styled.form`
  max-width: 500px;
`;

export const InputPrimary = styled.input`
  border: none;
  border-bottom: 1px solid var(--brand-grey);
  box-sizing: border-box;
  font-size: 22px;
  padding: 28px 18px 15px 0;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 25px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    border: 1px solid var(--brand-blue-hover);
    outline: 4px solid rgba(0, 59, 162, 0.44);
  }
`;

export const Input = styled(Field)`
  border: ${(props) =>
    props.error ? '1px solid red' : '1px solid var(--brand-grey)'};
  box-sizing: border-box;
  font-size: 20px;
  height: 38px;
  padding: 25px;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    border: 1px solid var(--brand-blue-hover);
    outline: 4px solid rgba(0, 59, 162, 0.44);
  }
`;

export const Textarea = styled(Field)`
  border: ${(props) =>
    props.error ? '1px solid red' : '1px solid var(--brand-grey)'};
  box-sizing: border-box;
  font-size: 20px;
  padding: 25px;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    outline: 4px solid rgba(0, 59, 162, 0.44);
    border: 1px solid var(--brand-blue-hover);
  }
`;

export const InputNonFormik = styled.input`
  border: 1px solid var(--brand-grey);
  box-sizing: border-box;
  font-size: 20px;
  height: 38px;
  padding: 25px 16px;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    border: 1px solid var(--brand-blue-hover);
  }
`;

export const InputTarget = styled.input`
  border: 1px solid var(--brand-grey);
  box-sizing: border-box;
  font-size: 12px;
  text-align: right;
  height: 16px;
  padding: 10px;
  border-radius: 0;
  width: 10%;
  outline: none;
  margin-bottom: 20px;
  -webkit-appearance: none;
  background: #fff;
  &:focus {
    border: 1px solid var(--brand-blue-hover);
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
  color: #2c2c2c;
  margin-bottom: 12px;
`;

export const Submit = styled.button`
  background-color: #003ba2;
  border: none;
  color: white;
  padding: 15px;
  margin: 5px;
`;

export const Select = styled.select`
  padding: 11px 52px 10px 14px;
  display: inline-block;
  background-color: #fff;
  border-radius: 0;
  border: 1px solid #000;
  margin: 8px 0 26px;
  -webkit-appearance: none;

  background-image: linear-gradient(45deg, #0000 50%, #fff 50%),
    linear-gradient(135deg, #fff 50%, #0000 50%),
    linear-gradient(to right, #2a2d34, #2a2d34);

  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;

  background-size: 8px 5px, 5px 5px, 2.5em 3.5em;
  background-repeat: no-repeat;
`;

export const NumericTextInput = styled(InputTarget)`
  font-size: 1em;
  height: 38px;
  width: 100px;
  margin-bottom: 0px;
`;
