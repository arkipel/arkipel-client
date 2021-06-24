import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

// Button
const Button = forwardRef<HTMLButtonElement, btnProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledButton ref={ref} {...props}>
        {children}
      </StyledButton>
    );
  },
);

type btnProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledButton = styled.button`
  width: 200px;
  padding: 6px;
  color: #fff;
  font-size: 18px;
  border: none;
  background: rgb(40, 40, 40);
  cursor: pointer;

  &:disabled {
    background: rgba(80, 80, 80);
    cursor: default;
  }

  @media all and (max-width: 499px) {
    width: 100%;
  }
`;

export { Button };
