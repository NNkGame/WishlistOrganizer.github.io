import React, { useState, useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import WishlistManager from './components/Wishlist/WishlistManager';
import PublicWishlists from './components/Wishlist/PublicWishlists';
import IdeaGenerator from './components/IdeaGenerator/IdeaGenerator';
import StorageService from './services/storage';
import './App.css';

function App() {
  const { user } = useTelegram();
  const [currentView, setCurrentView] = useState('my-lists');

  useEffect(() => {
    if (user) {
      StorageService.setUserId(user.id);
    }
  }, [user]);

  const renderView = () => {
    switch (currentView) {
      case 'my-lists':
        return <WishlistManager />;
      case 'public-lists':
        return <PublicWishlists />;
      case 'idea-generator':
        return <IdeaGenerator />;
      default:
        return <WishlistManager />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎁 Wishlist Organizer</h1>
        <nav className="navigation">
          <button 
            className={currentView === 'my-lists' ? 'active' : ''}
            onClick={() => setCurrentView('my-lists')}
          >
            Мои списки
          </button>
          <button 
            className={currentView === 'public-lists' ? 'active' : ''}
            onClick={() => setCurrentView('public-lists')}
          >
          Списки друзей
          </button>
          <button 
            className={currentView === 'idea-generator' ? 'active' : ''}
            onClick={() => setCurrentView('idea-generator')}
          >
            Генератор идей
          </button>
        </nav>
      </header>
      <main className="app-main">
        {renderView()}
      </main>
    </div>
  );
}

export default App;