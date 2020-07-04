import React, { FunctionComponent } from 'react';
import Media from 'react-media';

// Components
import Scrollable from '../ui/misc/Scrollable';

// Assets
import styles from './NotificationPane.scss';
import topBarStyles from '../styles/top-bar.scss';

const NotificationPane: FunctionComponent<props> = ({
  visible,
  onCloseClick,
}) => {
  let notificationPaneClassName = visible ? styles.visible + ' ' : '';
  notificationPaneClassName += styles.notificationPane;

  return (
    <div className={notificationPaneClassName}>
      <div
        className={topBarStyles.topBar + ' ' + topBarStyles.topBarNotification}
      >
        <Media
          query="(max-width: 999px)"
          render={() => (
            <div onClick={onCloseClick} className="button">
              <img
                src="https://icons.arkipel.io/ui/arrow_left.svg"
                alt="&#10092;"
              />
            </div>
          )}
        />
      </div>
      <Scrollable>
        <div className={styles.content}>
          <p>This section is a work in progress.</p>
        </div>
      </Scrollable>
    </div>
  );
};

type props = {
  visible: boolean;
  onCloseClick: () => void;
};

export default NotificationPane;
