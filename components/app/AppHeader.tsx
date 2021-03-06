import { useTranslation } from 'next-i18next';
import NotificationsMenu from './NotificationsMenu';
import ProfileMenu from './ProfileMenu';
import { IconCoin, Navbar, LinkType } from 'components';
import HeaderProvider from 'contexts/headerContext';

export const AppHeader = () => {
  const { t } = useTranslation();

  const navbarLinks: LinkType[] = [
    { url: '/app', text: 'navbar.home' },
    { url: '/app/wallet', text: 'navbar.wallet' },
    { url: '/app/expenses', text: 'navbar.expenses' },
    { url: '/app/analytics', text: 'navbar.analytics' },
  ];

  return (
    <HeaderProvider>
      <header className='header'>
        <div className='container'>
          <div className='header__left'>
            <IconCoin className='header__logo' />
            <Navbar links={navbarLinks} />
          </div>
          <div className='header__right'>
            <NotificationsMenu />
            <ProfileMenu />
          </div>
        </div>
      </header>
    </HeaderProvider>
  );
};
