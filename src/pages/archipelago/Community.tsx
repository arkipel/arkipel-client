import React, { Fragment } from 'react';
import styled from 'styled-components';

const Community = () => {
  return (
    <Fragment>
      <h1>Community</h1>
      <StyledList>
        <dt>
          <img src="https://arkipel-icons.pages.dev/logos/discord.svg" />
          <a href="https://discord.gg/Cm2vrTpJp8">Discord</a>
        </dt>
        <dd>Live chat for all players.</dd>
        <dt>
          <img src="https://arkipel-icons.pages.dev/logos/reddit.svg" />
          <a href="https://reddit.com/r/arkipel">Reddit</a>
        </dt>
        <dd>Discussion board for all players.</dd>
      </StyledList>
    </Fragment>
  );
};

const StyledList = styled.dl`
  display: grid;
  gap: 10px;
  list-style-type: none;

  dt {
    display: grid;
    grid-template-columns: 30px 1fr;
    align-items: center;
    gap: 10px;

    a {
      font-weight: bold;
    }

    img {
      height: 30px;
      width: 30px;
    }
  }
`;

export default Community;
