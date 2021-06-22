import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Form: FunctionComponent<{
  onSubmit?: () => void;
}> = ({ children, onSubmit }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

const StyledForm = styled.form`
  display: grid;
  gap: 10px;

  @media all and (max-width: 499px) {
    button,
    input {
      width: 100%;
    }
  }
`;

export { Form };
