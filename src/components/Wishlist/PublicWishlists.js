import React, { useState, useEffect } from 'react';
import StorageService from '../../services/storage';
import PublicWishlistItem from './PublicWishlistItem';

const PublicWishlists = () => {
  const [publicWishlists, setPublicWishlists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPublicWishlists();
  }, []);

  const loadPublicWishlists = () => {
    const lists = StorageService.getPublicWishlists();
    setPublicWishlists(lists);
  };

  const filteredWishlists = publicWishlists.filter(wishlist =>
    wishlist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wishlist.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateWishlist = (updatedWishlist) => {
    StorageService.savePublicWishlist(updatedWishlist);
    loadPublicWishlists();
  };

  return (
    <div className="public-wishlists">
      <div className="public-header">
        <h2>🎁 Списки желаний друзей</h2>
        <p>Здесь вы можете просматривать публичные списки желаний других пользователей</p>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="wishlists-grid">
        {filteredWishlists.map(wishlist => (
          <PublicWishlistItem
            key={wishlist.id}
            wishlist={wishlist}
            onUpdate={handleUpdateWishlist}
          />
        ))}
        
        {filteredWishlists.length === 0 && (
          <div className="empty-state">
            {searchTerm ? (
              <p>По вашему запросу ничего не найдено</p>
            ) : (
              <p>Пока нет публичных списков желаний</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicWishlists;