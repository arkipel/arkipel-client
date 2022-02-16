import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Form: FunctionComponent<{
  className?: string;
  onSubmit?: () => void;
}> = ({ children, className, onSubmit }) => {
  return (
    <StyledForm className={className} onSubmit={onSubmit}>
      {children}
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: grid;
  gap: 10px;
`;

export { Form };
