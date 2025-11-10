import React, { useState, useEffect } from 'react';
import WishlistForm from './WishlistForm';
import WishlistItem from './WishlistItem';
import StorageService from '../../services/storage';

const WishlistManager = () => {
  const [wishlists, setWishlists] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWishlist, setEditingWishlist] = useState(null);

  useEffect(() => {
    loadWishlists();
  }, []);

  const loadWishlists = () => {
    const savedWishlists = StorageService.getWishlists();
    setWishlists(savedWishlists);
  };

  const saveWishlists = (updatedWishlists) => {
    setWishlists(updatedWishlists);
    StorageService.saveWishlists(updatedWishlists);
    
    // Сохраняем публичные списки отдельно
    updatedWishlists
      .filter(w => w.isPublic)
      .forEach(w => StorageService.savePublicWishlist(w));
  };

  const handleCreateWishlist = (wishlistData) => {
    const newWishlist = {
      ...wishlistData,
      id: Date.now().toString(),
      gifts: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedWishlists = [...wishlists, newWishlist];
    saveWishlists(updatedWishlists);
    setShowForm(false);
  };

  const handleUpdateWishlist = (wishlistData) => {
    const updatedWishlists = wishlists.map(w =>
      w.id === editingWishlist.id 
        ? { ...w, ...wishlistData, updatedAt: new Date() }
        : w
    );
    
    saveWishlists(updatedWishlists);
    setEditingWishlist(null);
  };

  const handleDeleteWishlist = (id) => {
    const updatedWishlists = wishlists.filter(w => w.id !== id);
    saveWishlists(updatedWishlists);
  };

  return (
    <div className="wishlist-manager">
      <div className="manager-header">
        <h2>Мои списки желаний</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Создать список
        </button>
      </div>

      {showForm && (
        <WishlistForm
          onSubmit={handleCreateWishlist}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingWishlist && (
        <WishlistForm
          wishlist={editingWishlist}
          onSubmit={handleUpdateWishlist}
          onCancel={() => setEditingWishlist(null)}
        />
      )}

      <div className="wishlists-grid">
        {wishlists.map(wishlist => (
          <WishlistItem
            key={wishlist.id}
            wishlist={wishlist}
            onEdit={() => setEditingWishlist(wishlist)}
            onDelete={() => handleDeleteWishlist(wishlist.id)}
            onUpdate={(updated) => {
              const updatedWishlists = wishlists.map(w =>
                w.id === updated.id ? updated : w
              );
              saveWishlists(updatedWishlists);
            }}
          />
        ))}
        
        {wishlists.length === 0 && (
          <div className="empty-state">
            <p>У вас пока нет списков желаний</p>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Создать первый список
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistManager;