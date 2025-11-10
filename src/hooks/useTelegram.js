import { useEffect, useState } from 'react';

export const useTelegram = () => {
  const [tg, setTg] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем, что Telegram Web App API доступен
    if (window.Telegram && window.Telegram.WebApp) {
      const telegram = window.Telegram.WebApp;
      telegram.ready();
      telegram.expand();
      setTg(telegram);
      setUser(telegram.initDataUnsafe?.user || null);
    } else {
      // Заглушка для разработки вне Telegram
      console.warn('Telegram Web App not available - running in development mode');
      setUser({
        id: 123456789,
        first_name: 'Test',
        last_name: 'User',
        username: 'testuser'
      });
    }
  }, []);

  return {
    tg,
    user,
    closeApp: () => tg?.close?.(),
    showAlert: (message) => tg?.showAlert?.(message),
    showConfirm: (message) => tg?.showConfirm?.(message),
  };
};