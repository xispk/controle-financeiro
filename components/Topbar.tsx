import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import IconCoin from './IconCoin';
import { MdNotifications, MdOutlineClose } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useEffect } from 'react';
import Navbar, { LinkType } from './Navbar';
import FloatingMenu from './FloatingMenu';

const Topbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const themeRef = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const [myTheme, setMyTheme] = useState<string>('dark');

  const languages = ['pt', 'en'];
  const themes = ['light', 'dark'];

  const navbarLinks: LinkType[] = [
    { url: '/app', text: 'navbar.home' },
    { url: '/app/wallet', text: 'navbar.wallet' },
    { url: '/app/expenses', text: 'navbar.expenses' },
    { url: '/app/analytics', text: 'navbar.analytics' },
  ];

  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push('/app', '/app', { locale });
  };

  const handleChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    const theme = e.target.value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setMyTheme(theme);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setMyTheme(theme);
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      setMyTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <header className='topbar'>
      <div className='container'>
        <div className='topbar__left'>
          <IconCoin className='logo' />
          <Navbar links={navbarLinks} />
        </div>
        <div className='topbar__right'>
          {/* <MdNotifications className='topbar__icon' title='Notificações' /> */}
          <FloatingMenu menuIcon='MdNotifications' heading='Notificações' />
          <FloatingMenu menuIcon='FaUserCircle' heading='Conta'>
            <div className='profile__options'>
              <div className='profile__option-group'>
                <label htmlFor='languages'>Idioma</label>
                <select
                  name='languages'
                  id='languages'
                  onChange={(e) => handleChangeLanguage(e)}
                  defaultValue={router.locale}
                  className='profile__select'
                >
                  {languages.map((lang, index) => {
                    const value = t(`languages.${lang}`);
                    return (
                      <option key={index} value={lang}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className='profile__option-group'>
                <label htmlFor='themes'>Tema</label>
                <select
                  name='themes'
                  id='themes'
                  onChange={(e) => handleChangeTheme(e)}
                  defaultValue={myTheme}
                  ref={themeRef}
                  className='profile__select'
                >
                  {themes.map((theme, index) => {
                    const value = t(`themes.${theme}`);
                    return (
                      <option key={index} value={theme}>
                        {value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </FloatingMenu>
        </div>

        {/* <div className={isProfileOpen ? 'profile' : 'profile profile--closed'}>
          <div className='profile__heading'>
            <span>Conta</span>
            <MdOutlineClose
              className='profile__close'
              onClick={() => setIsProfileOpen(false)}
            />
          </div>
          <ul className='profile__menu'>
            
          </ul>
        </div> */}
      </div>
    </header>
  );
};

export default Topbar;
