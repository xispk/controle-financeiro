import Link from 'next/link';
import { useState, useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import { MdOutlineClose } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

import { useHeader } from './app/store';

export interface LinkType {
  url: string;
  text: string;
}

const Navbar = ({ links }: { links: LinkType[] }) => {
  const { isNavOpen, handleCloseMenus } = useHeader();
  const navbarRef = useRef(null);
  const { t } = useTranslation('app-header');

  const handleCloseNav = (e: MouseEvent<HTMLElement>) => {
    if (e.target !== navbarRef.current) return;
    handleCloseMenus();
  };

  return (
    <>
      <GiHamburgerMenu
        className='topbar__icon topbar__icon--menu-trigger'
        onClick={() => handleCloseMenus('nav')}
        title={t('navbar.title')}
      />
      <nav
        className={isNavOpen ? 'navigation' : 'navigation navigation--closed'}
        onClick={(e) => handleCloseNav(e)}
        ref={navbarRef}
      >
        <div className='navigation__heading'>
          <MdOutlineClose
            className='navigation__close'
            onClick={() => handleCloseMenus('nav')}
          />
          <span>{t('navbar.heading')}</span>
        </div>
        <ul className='navigation__menu'>
          {links.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.url}>
                  <a className='navigation__link'>{t(link.text)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
