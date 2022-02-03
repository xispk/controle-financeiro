import { MdOutlineClose } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

import { useHeader } from '../../../contexts/headerContext';

const ProfileMenu = () => {
  const { isProfileOpen, handleCloseMenus } = useHeader();
  const { t } = useTranslation('app-header');

  return (
    <div className='floating-menu__container'>
      <FaUserCircle
        className='floating-menu__open'
        title={t('profile.title')}
        onClick={() => handleCloseMenus('profile')}
      />
      <div
        className={
          isProfileOpen
            ? 'floating-menu'
            : 'floating-menu floating-menu--closed'
        }
      >
        <div className='floating-menu__heading'>
          <span>{t('profile.heading')}</span>
          <MdOutlineClose
            className='floating-menu__close'
            onClick={() => handleCloseMenus('profile')}
          />
        </div>
        <div className='floating-menu__body'></div>
      </div>
    </div>
  );
};

export default ProfileMenu;
