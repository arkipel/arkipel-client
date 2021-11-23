import React, {
  forwardRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import styled from 'styled-components';

// Input
const Input = React.forwardRef<HTMLInputElement, props>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

type props = InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  padding: 6px;
  font-size: 18px;
  border: 1px solid black;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:disabled {
    background: #eee;
  }

  @media all and (max-width: 499px) {
    width: 100%;
  }
`;

// TextArea
const TextArea = React.forwardRef<HTMLTextAreaElement, textAreaProps>(
  (textAreaProps, ref) => {
    return <StyledTextArea ref={ref} {...textAreaProps} />;
  },
);

type textAreaProps = InputHTMLAttributes<HTMLTextAreaElement>;

const StyledTextArea = styled.textarea`
  padding: 6px;
  font-size: 18px;
  border: 1px solid black;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:disabled {
    background: #eee;
  }

  @media all and (max-width: 499px) {
    width: 100%;
  }
`;

// Submit (input)
const Submit = forwardRef<HTMLInputElement, submitProps>(
  ({ ...props }, ref) => {
    return <StyledSubmit type="submit" ref={ref} {...props} />;
  },
);

type submitProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const StyledSubmit = styled.input`
  width: 200px;
  padding: 6px;
  color: #fff;
  font-size: 18px;
  border: none;
  background: rgb(40, 40, 40);
  cursor: pointer;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:disabled {
    background: rgba(80, 80, 80);
    cursor: default;
  }

  @media all and (max-width: 499px) {
    width: 100%;
  }
`;

// Select
const Select = forwardRef<HTMLSelectElement, selectProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledSelect ref={ref} {...props}>
        {children}
      </StyledSelect>
    );
  },
);

type selectProps = SelectHTMLAttributes<HTMLSelectElement>;

const StyledSelect = styled.select`
  padding: 6px;
  color: #000;
  font-size: 18px;
  border: 1px solid black;
  background: #fff;
  cursor: pointer;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:disabled {
    color: #666;
    background: #eee;
  }

  @media all and (max-width: 499px) {
    width: 100%;
  }
`;

// Radio
const Radio = forwardRef<HTMLInputElement, radioProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledRadio>
        <Input type="radio" ref={ref} {...props} />
        <span>{props.label}</span>
      </StyledRadio>
    );
  },
);

interface radioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

const StyledRadio = styled.label`
  display: block;
  cursor: pointer;
  border-radius: 0;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  span {
    display: block;
    padding: 6px;
    text-align: center;
    width: 100%;
    border-bottom: 4px solid #eee;
  }

  input:checked ~ span {
    border-bottom: 4px solid black;
  }

  &:disabled {
    background: rgba(80, 80, 80);
    cursor: default;
  }

  input {
    display: none;
  }
`;

export { Input, TextArea, Submit, Select, Radio };
