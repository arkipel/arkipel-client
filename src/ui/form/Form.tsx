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
`;

export { Form };
