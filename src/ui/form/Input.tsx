import React, { forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const Input = React.forwardRef<HTMLInputElement, props>((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

type props = InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  padding: 6px;
  font-size: 18px;
  border: 1px solid black;
`;

// Submit (input)
const Submit = forwardRef<HTMLInputElement, submitProps>(
  ({ ...props }, ref) => {
    return <StyledSubmit type="submit" ref={ref} {...props} />;
  },
);

type submitProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const StyledSubmit = styled.input`
  padding: 6px;
  color: #fff;
  font-size: 18px;
  border: none;
  background: rgb(40, 40, 40);
  cursor: pointer;

  &:disabled {
    background: rgba(80, 80, 80);
  }
`;

export { Input, Submit };
