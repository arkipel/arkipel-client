import React, { FunctionComponent } from 'react';

const Label: FunctionComponent<props> = ({
  text,
  textColor,
  backgroundColor,
}) => {
  let style = {
    padding: '2px 4px',
    color: '',
    background: '',
    borderRadius: '2px',
  };

  if (textColor) {
    style.color = textColor;
  }

  if (backgroundColor) {
    style.background = backgroundColor;
  }

  return <span style={style}>{text}</span>;
};

interface props {
  text: string;
  textColor?: string;
  backgroundColor?: string;
}

export default Label;
