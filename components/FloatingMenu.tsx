import { useEffect, ReactNode, useState } from 'react';

import { MdOutlineClose, MdNotifications } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useRef } from 'react';

const FloatingMenu = ({
  heading,
  menuIcon,
  children,
}: {
  heading: string;
  menuIcon: string;
  children?: ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='floating-menu__container'>
      {menuIcon === 'MdNotifications' ? (
        <MdNotifications
          className='floating-menu__open'
          title='Notificações'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      ) : (
        <FaUserCircle
          className='floating-menu__open'
          title='Opções de conta'
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}

      <div
        className={
          isSidebarOpen
            ? 'floating-menu'
            : 'floating-menu floating-menu--closed'
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className='floating-menu__heading'>
          <span>{heading}</span>
          <MdOutlineClose
            className='floating-menu__close'
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        <div className='floating-menu__body'>{children}</div>
      </div>
    </div>
  );
};

export default FloatingMenu;
