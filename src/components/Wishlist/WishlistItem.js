import React, { useState } from 'react';
import GiftItemForm from '../GiftItem/GiftItemForm';
import GiftItem from '../GiftItem/GiftItem';


const WishlistItem = ({ wishlist, onEdit, onDelete, onUpdate }) => {
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAddGift = (giftData) => {
    const newGift = {
      ...giftData,
      id: Date.now().toString(),
      isReserved: false,
      createdAt: new Date(),
    };

    const updatedWishlist = {
      ...wishlist,
      gifts: [...wishlist.gifts, newGift],
      updatedAt: new Date(),
    };

    onUpdate(updatedWishlist);
    setShowGiftForm(false);
  };

  const handleUpdateGift = (giftId, updates) => {
    const updatedGifts = wishlist.gifts.map(g =>
      g.id === giftId ? { ...g, ...updates } : g
    );

    const updatedWishlist = {
      ...wishlist,
      gifts: updatedGifts,
      updatedAt: new Date(),
    };

    onUpdate(updatedWishlist);
  };

  const handleDeleteGift = (giftId) => {
    const updatedGifts = wishlist.gifts.filter(g => g.id !== giftId);
    
    const updatedWishlist = {
      ...wishlist,
      gifts: updatedGifts,
      updatedAt: new Date(),
    };

    onUpdate(updatedWishlist);
  };

  return (
    <div className="wishlist-item">
      <div className="wishlist-header" onClick={() => setExpanded(!expanded)}>
        <div className="wishlist-info">
          <h4>{wishlist.title}</h4>
          {wishlist.description && (
            <p className="wishlist-description">{wishlist.description}</p>
          )}
          <div className="wishlist-meta">
            <span>Подарков: {wishlist.gifts.length}</span>
            <span className={`visibility ${wishlist.isPublic ? 'public' : 'private'}`}>
              {wishlist.isPublic ? 'Публичный' : 'Приватный'}
            </span>
          </div>
        </div>
        
        <div className="wishlist-actions">
          <button 
            className="btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Редактировать"
          >
            ✏️
          </button>
          <button 
            className="btn-icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            title="Удалить"
          >
            🗑️
          </button>
          <span className={`expand-arrow ${expanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
      </div>

      {expanded && (
        <div className="wishlist-content">
          <div className="gifts-section">
            <div className="section-header">
              <h5>Идеи для подарков</h5>
              <button 
                className="btn-secondary"
                onClick={() => setShowGiftForm(true)}
              >
                + Добавить подарок
              </button>
            </div>

            {showGiftForm && (
              <GiftItemForm
                onSubmit={handleAddGift}
                onCancel={() => setShowGiftForm(false)}
              />
            )}

            <div className="gifts-list">
              {wishlist.gifts.map(gift => (
                <GiftItem
                  key={gift.id}
                  gift={gift}
                  onUpdate={(updates) => handleUpdateGift(gift.id, updates)}
                  onDelete={() => handleDeleteGift(gift.id)}
                  isOwner={true}
                />
              ))}
              
              {wishlist.gifts.length === 0 && (
                <p className="empty-gifts">Пока нет идей для подарков</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistItem;