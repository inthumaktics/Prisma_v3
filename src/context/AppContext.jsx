import { createContext, useContext, useState, useCallback, useRef } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [drawerCompany, setDrawerCompany] = useState(null);
  const [modalContent, setModalContent]   = useState(null);
  const [toastMsg, setToastMsg]           = useState('');
  const [toastVisible, setToastVisible]   = useState(false);
  const toastTimer = useRef(null);

  const openDrawer = useCallback((company) => setDrawerCompany(company), []);
  const closeDrawer = useCallback(() => setDrawerCompany(null), []);

  const openModal = useCallback((content) => setModalContent(content), []);
  const closeModal = useCallback(() => setModalContent(null), []);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setToastVisible(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2600);
  }, []);

  return (
    <AppContext.Provider value={{ drawerCompany, openDrawer, closeDrawer, modalContent, openModal, closeModal, showToast, toastMsg, toastVisible }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
