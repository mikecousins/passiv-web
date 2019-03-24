import styled from '@emotion/styled';
import { Field } from 'formik';

// Forms, inputs, buttons

export const Form = styled.form`
  max-width: 500px;
`;

export const Input = styled(Field)`
  border: ${props =>
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
  &:focus {
  	border: 1px solid var(--brand-blue-hover);
    outline: 4px solid rgba(0,59,162,0.44);
  }
`;

export const Textarea = styled.textarea`
  border: ${props =>
    props.error ? '1px solid red' : '1px solid var(--brand-grey)'};
  box-sizing: border-box;
  font-size: 20px;
  padding: 25px;
  border-radius: 0;
  width: 100%;
  outline: none;
  margin-bottom: 20px;
  -webkit-appearance: none;
  &:focus {
    outline: 4px solid rgba(0,59,162,0.44);
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
  background-color: #003BA2;
  border: none;
  color: white;
  padding: 15px;
  margin: 5px;
`;
