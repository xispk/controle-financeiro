import { MdOutlineClose, MdNotifications } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

import { useHeader } from '../../../contexts/headerContext';

const FloatingMenu = () => {
  const { isNotificationsOpen, handleCloseMenus } = useHeader();
  const { t } = useTranslation('app-header');

  return (
    <div className='floating-menu__container'>
      <MdNotifications
        className='floating-menu__open'
        title={t('notifications.title')}
        onClick={() => handleCloseMenus('notifications')}
      />
      <div
        className={
          isNotificationsOpen
            ? 'floating-menu'
            : 'floating-menu floating-menu--closed'
        }
      >
        <div className='floating-menu__heading'>
          <span>{t('notifications.heading')}</span>
          <MdOutlineClose
            className='floating-menu__close'
            onClick={() => handleCloseMenus('notifications')}
          />
        </div>
        <div className='floating-menu__body'></div>
      </div>
    </div>
  );
};

export default FloatingMenu;
