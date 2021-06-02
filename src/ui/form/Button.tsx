import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const Button: FunctionComponent<{
  enabled: boolean;
  onClick: () => void;
}> = ({ children, enabled, onClick }) => {
  return (
    <ButtonStyle disabled={!enabled} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button`
  padding: 6px;
  color: #fff;
  font-size: 18px;
  border: none;
  background: rgb(40, 40, 40);
  cursor: pointer;
`;

const Submit: FunctionComponent<{
  text: string;
  enabled: boolean;
}> = ({ text, enabled }) => {
  return <InputStyle type="submit" value={text} disabled={!enabled} />;
};

const InputStyle = styled.input`
  padding: 6px;
  color: #fff;
  font-size: 18px;
  border: none;
  background: rgb(40, 40, 40);
  cursor: pointer;
`;

export { Button, Submit };
