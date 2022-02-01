import { useContext } from 'react';
import { useState, createContext, ReactElement } from 'react';

interface HeaderContext {
  isProfileOpen?: boolean;
  setIsProfileOpen: Function;
  isNavOpen?: boolean;
  setIsNavOpen: Function;
  isNotificationsOpen?: boolean;
  setIsNotificationsOpen: Function;
  handleCloseMenus: (menu?: string) => void;
}

const HeaderContext = createContext<HeaderContext>({
  setIsProfileOpen: () => false,
  setIsNavOpen: () => false,
  setIsNotificationsOpen: () => false,
  handleCloseMenus: () => false,
});

const HeaderProvider = ({ children }: { children: ReactElement }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleCloseMenus = (menu?: string) => {
    if (menu === 'nav') {
      setIsProfileOpen(false);
      setIsNotificationsOpen(false);
      setIsNavOpen(!isNavOpen);
    } else if (menu === 'profile') {
      setIsProfileOpen(!isProfileOpen);
      setIsNotificationsOpen(false);
      setIsNavOpen(false);
    } else if (menu === 'notifications') {
      setIsProfileOpen(false);
      setIsNotificationsOpen(!isNotificationsOpen);
      setIsNavOpen(false);
    } else {
      setIsProfileOpen(false);
      setIsNotificationsOpen(false);
      setIsNavOpen(false);
    }
  };

  const values = {
    isProfileOpen,
    setIsProfileOpen,
    isNavOpen,
    setIsNavOpen,
    isNotificationsOpen,
    setIsNotificationsOpen,
    handleCloseMenus,
  };

  return (
    <HeaderContext.Provider value={values}>{children}</HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);

export default HeaderProvider;
